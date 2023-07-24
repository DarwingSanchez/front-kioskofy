import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject, lastValueFrom } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { CountriesService } from 'src/app/core/services/countries/countries.service';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';
import { DATA_FILTERS_PORTFOLIO } from '../../../environments/global-variables';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { MapSelectRadiusComponent } from 'src/app/modal/map-select-radius/map-select-radius.component';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { FILTERS_PORTFOLIO } from 'src/app/core/interfaces/portfolio/filters_portfolio.imterface';
import { removeFalseAndFalsyKeys } from 'src/app/core/helpers/functions/removeFalseAndFalsyKeys';
import { findObjectInArrayByProperty } from 'src/app/core/helpers/functions/findObjectInArrayByProperty';
import { FONT_AWESOME_ICONS } from 'src/app/core/constants/icons';


@Component({
  selector: 'app-portfolio-filters',
  templateUrl: './portfolio-filters.component.html',
  styleUrls: ['./portfolio-filters.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PortfolioFiltersComponent implements OnInit, OnChanges {
  @Input() type_filter!: 'products' | 'services' | 'stores';
  @Input() page_current!: number;
  @Input() page_limit!: number;
  @Input() search_text!: string;
  @Output() emitFilters = new EventEmitter();
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  public categories: any[] = [];
  public countries: any[] = [];
  public conditions = DATA_FILTERS_PORTFOLIO.condition_list;
  public sort_list = DATA_FILTERS_PORTFOLIO.sort_list;
  public price_list = DATA_FILTERS_PORTFOLIO.price_list;
  public readonly FONT_AWESOME_ICONS = FONT_AWESOME_ICONS;
  public search_location!: any;
  public form_filters: UntypedFormGroup;
  public filters_applied: FILTERS_PORTFOLIO = {
    page: this.page_current,
    limit: this.page_limit,
    search_text: this.search_text,
    countries: [],
    categories: [],
    condition: [],
    price: '',
    sort_by: '',
    best_seller: false,
    trending: false,
    hand_crafted: false,
    recommended: false,
    start_up: false,
    non_profit: false,
    location: ''
  }

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
  ) {
    this.form_filters = this._formBuilder.group({
      sort_by: ['createdAt_1'],
      price: [''],
      best_seller: [false],
      trending: [false],
      hand_crafted: [false],
      recommended: [false],
      start_up: [false],
      non_profit: [false],
      condition_new: [false],
      condition_used: [false],
      condition_not_specified: [false],
    });
  }

  async ngOnInit() {
    try {
      await this.getFilterLocation();
      await this.getActiveCategories();
      await this.getActiveCountries();
      await this.getConditions();
      this.getPriceFilterRanges(13500);
      await this.getQueryParamsFromURL();
      this.subscribeToForms();
      this.getFilters();
    } catch (error) {
      this.alertUser('alert', '¡Oh oh!', 'Sorry, we are experiencing some problems, try again later');
    }
  }

  ngOnChanges(): void {
    if (this.page_current && this.search_location) this.getFilters();
  }

  // Get the query param filter in the URL and updates the DOM and filters applied object
  private getQueryParamsFromURL(): void {
    const QUERY_SUBSCRIPTION = this.activatedRoute.queryParamMap.subscribe(params => {
    // ******* location: string
      if (params.get('page')) this.form_filters.get('page')?.patchValue(params.get('page'));
      if (params.get('limit')) this.form_filters.get('limit')?.patchValue(params.get('limit'));
      if (params.get('search_text')) this.form_filters.get('search_text')?.patchValue(params.get('search_text'));
      if (params.get('price')) this.form_filters.get('price')?.patchValue(params.get('price'));
      if (params.get('sort_by')) this.form_filters.get('sort_by')?.patchValue(params.get('sort_by'));
      if (params.getAll('countries').length > 0) this.updatesFormDynamicallyFromURL(params.getAll('countries'));
      if (params.getAll('categories').length > 0) this.updatesFormDynamicallyFromURL(params.getAll('categories'));
      if (params.getAll('condition').length > 0) this.updatesFormDynamicallyFromURL(params.getAll('condition'));
      if (params.get('best_seller') === 'true') this.form_filters.get('best_seller')?.patchValue(true);
      if (params.get('trending') === 'true') this.form_filters.get('trending')?.patchValue(true);
      if (params.get('hand_crafted') === 'true') this.form_filters.get('hand_crafted')?.patchValue(true);
      if (params.get('recommended') === 'true') this.form_filters.get('recommended')?.patchValue(true);
      if (params.get('start_up') === 'true') this.form_filters.get('start_up')?.patchValue(true);
      if (params.get('non_profit') === 'true') this.form_filters.get('non_profit')?.patchValue(true);
    });
    // Unsubscribe to avoid a infinite loop of apply filters
    QUERY_SUBSCRIPTION.unsubscribe();
  }

  // Get into local storage the filter location
  private async getFilterLocation() {
    await this.localStorageService.getItem('filter_location')
      .then((resp: any) => { 
        if(resp.lat && resp.lng) {
          this.search_location = resp;
          delete this.search_location.address;
        };
      }).catch((error: any) => {
        throw error;
      })
  }

  // Get the active categories that ca be used for the filter
  public async getActiveCategories() {
    try {
      let filters = { title: '', type: 'product', status: 'active', limit: 10000, page: 1, sort: 'title' , sort_order: 1 };
      let response = await lastValueFrom(this.categoriesService.getCategoriesByFilters(filters)).then((resp: any) => { return resp });
      if(response.success) {
        this.categories = response.data.data;
        this.createFormControlForFilter('category', this.categories);
      };
    } catch (error) {
      throw error;
    }
  }
  
  // Get the active countries that ca be used for the filter
  public async getActiveCountries() {
    try {
      let filters = { name: '', code: '', isoCode: '', flag: '', status: 'active', limit: 10000, page: 1, sort: 'name' , sort_order: 1 };
      let response = await lastValueFrom(this.countriesService.getCountriesByFilters(filters)).then((resp: any) => { return resp });
      if(response.success) {
        this.countries = response.data.data;
        this.createFormControlForFilter('country', this.countries);
      };
    } catch (error) {
      throw error;
    }
  }
  
  // Get the conditions filters
  public async getConditions() {
    if (this.conditions) this.createFormControlForFilter('condition', this.conditions);
  }

  /**
   * Set the filters by price based on the max price
   * of the portfolio in order to not show filters
   * that wont get any results because are above of the max
   * @param price max price of the portfolio
   */
  getPriceFilterRanges(price: number) {
    let steps = [50, 100, 250, 500, 1000, 3000, 5000, 7500, 10000, 15000, 20000, 50000, 100000];
    for (let index = 1; index < steps.length; index++) {
      // Add the filter objects to an array
      this.price_list.push({
        name: '$' + steps[index - 1] + ' - $' + steps[index],
        slug: steps[index - 1] + '-' + steps[index],
      });
      // If the filter is greater than the max price, exit
      if (steps[index] >= price)
        break;
    }
  }

  /**
   * Add key to capture the filter and creates the form control
   * @param flag type of filter to add the filter value and create the form, e.g. 'category'
   * @param filter Array of objects to be converted to filter form
   */
  private createFormControlForFilter(flag: string, filter: any): void {
    for (const iterator of filter) {
      iterator.filter = false;
      switch (flag) {
        case 'category':
          this.form_filters.addControl(iterator.slug, new UntypedFormControl(false));
          break;
        case 'country':
          this.form_filters.addControl(iterator.isoCode, new UntypedFormControl(false));
          break;
        case 'condition':
          this.form_filters.addControl(iterator.filter, new UntypedFormControl(false));
          break;
        default:
          break;
      }
    }
  }

  /**
   * Reads the URL params and compares with the input form
   * If key form is in the url, updates the input-form as selected
   * No return, the function updates directly the form values (if required)
   * @param type_form describes the type of form-filter we are checking
   * @param url_params all query params read in the URL
   */
  private updatesFormDynamicallyFromURL(url_params: any): void {
    for (const FORM_SLUG in this.form_filters.value)
      if (url_params.includes(FORM_SLUG))
        this.form_filters.get(FORM_SLUG)?.patchValue(true);
  }

  // Subscribe to all forms to detect changes, if change are apply it will update the filters
  private subscribeToForms(): void {
    this.form_filters.valueChanges.subscribe(value => { this.getFilters() });
  }

  // Read all forms and gather the applied filters in one object to construct the URL params
  private getFilters(): void {
    // Default filters
    this.filters_applied = {
      page: this.page_current,
      limit: this.page_limit,
      countries: [],
      categories: [],
      condition: [],
      search_text: this.search_text,
      price: '',
      sort_by: '',
      best_seller: false,
      trending: false,
      hand_crafted: false,
      recommended: false,
      start_up: false,
      non_profit: false,
      location: JSON.stringify(this.search_location)
    };
    // If a filter is applied, adds it to the url
    if (this.search_text) this.filters_applied.search_text = this.search_text;
    if (this.form_filters.get('price')?.value) this.filters_applied.price = this.form_filters.get('price')?.value;
    if (this.form_filters.get('sort_by')?.value) this.filters_applied.sort_by = this.form_filters.get('sort_by')?.value;
    if (this.form_filters.get('best_seller')?.value) this.filters_applied.best_seller = this.form_filters.get('best_seller')?.value;
    if (this.form_filters.get('trending')?.value) this.filters_applied.trending = this.form_filters.get('trending')?.value;
    if (this.form_filters.get('hand_crafted')?.value) this.filters_applied.hand_crafted = this.form_filters.get('hand_crafted')?.value;
    if (this.form_filters.get('recommended')?.value) this.filters_applied.recommended = this.form_filters.get('recommended')?.value;
    if (this.form_filters.get('start_up')?.value) this.filters_applied.start_up = this.form_filters.get('start_up')?.value;
    if (this.form_filters.get('non_profit')?.value) this.filters_applied.non_profit = this.form_filters.get('non_profit')?.value;
    for (let key of this.conditions)
      if (this.form_filters.value[key.slug]) this.filters_applied.condition.push(key.slug);
    for (let key of this.categories)
      if (this.form_filters.value[key.slug]) this.filters_applied.categories.push(key.slug);
    for (let key of this.countries)
      if (this.form_filters.value[key.isoCode]) this.filters_applied.countries.push(key.isoCode);

    this.navigateToURLWithFilters();
    this.sendFiltersToParent();
  }

  public sendFiltersToParent() {
    const FILTERS = this.translateFiltersToMongoID();
    this.emitFilters.emit(FILTERS);
  }
  
  // The category and country filters need to be translate to mongo '_id' in order to work on the query
  private translateFiltersToMongoID(): object {
    const FILTERS = this.filters_applied;
    FILTERS.categories =
      this.filters_applied.categories.map((category: any) => findObjectInArrayByProperty(this.categories, 'slug', category, '_id'));
    FILTERS.countries =
      this.filters_applied.countries.map((country: any) => findObjectInArrayByProperty(this.countries, 'isoCode', country, '_id'));
    return FILTERS
  }

  // Reload the page with the new filters as queryparams on the URL
  private navigateToURLWithFilters(): void {
    const FILTERS = removeFalseAndFalsyKeys(this.filters_applied);  
    this.router.navigate(['/products/all'], { queryParams: FILTERS });
  }

  public openModalChangeSearchLocation():void {
    const modalRef = this.modalService.open(MapSelectRadiusComponent, this.ng_modal_options);
    modalRef.componentInstance.close_callback = () => {};
  }

  // Clear all filters
  public clearFilters(): void {
    this.form_filters.reset()
    this.getFilters();
  }

  // Open modal to alert the user
  private alertUser(img_flag: string, title: string, msg: string): void {
    const modalRef = this.modalService.open(SimpleAlertComponent, this.ng_modal_options);
    modalRef.componentInstance.img_src = img_flag;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.btn_msg = 'Volver';
    modalRef.componentInstance.close_callback = () => {
      this.router.navigate(['/home']);
    };
  }
}
