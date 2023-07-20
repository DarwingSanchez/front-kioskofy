import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject, lastValueFrom } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { CountriesService } from 'src/app/core/services/countries/countries.service';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';
import { GlobalVariables } from '../../../environments/global-variables';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { MapSelectRadiusComponent } from 'src/app/modal/map-select-radius/map-select-radius.component';
import { ProductsService } from 'src/app/core/services/products/products.service';


@Component({
  selector: 'app-portfolio-filters',
  templateUrl: './portfolio-filters.component.html',
  styleUrls: ['./portfolio-filters.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PortfolioFiltersComponent implements OnInit, OnChanges {
  @Input() type_filter!: 'products' | 'services' | 'stores';
  @Input() page_current!: any;
  @Input() page_limit!: number;
  @Input() search_text!: string;
  @Output() emitFilters = new EventEmitter();
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  public categories: any[] = [];
  public countries: any[] = [];
  public form_filter_categories: UntypedFormGroup = new UntypedFormGroup({});
  public form_filter_countries: UntypedFormGroup = new UntypedFormGroup({});
  public form_conditions = this._formBuilder.group({ new: false, used: false, unknown: false });
  public form_filter_sort_by = this._formBuilder.group({ sort_by: '' });
  public form_filter_price = this._formBuilder.group({ price: '' });
  public filters_applied: any = { status: 'accepted', page: this.page_current, limit: this.page_limit, search_text: this.search_text, countries: [], categories: [], condition: [], price: '', sort_by: '' }
  public sort_list = GlobalVariables.sort_list;
  public condition_list = GlobalVariables.condition_list;
  public price_list = GlobalVariables.price_list;
  public search_location!: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService,
    private localStorageService: LocalStorageService,
    private productsService: ProductsService,
    private modalService: NgbModal,
  ) {}

  async ngOnInit() {
    try {
      await this.getFilterLocation();
      await this.getActiveCategories();
      await this.getActiveCountries();
      this.getPriceFilterRanges(13500);
      this.getQueryParamsFromURL();
      this.subscribeToForms();
      this.getFilters();
    } catch (error) {
      this.alertUser('alert', '¡Oh oh!', 'Sorry, we are experiencing some problems, try again later');
    }
  }

  ngOnChanges(): void {
    if (this.page_current || this.search_location) this.getFilters();
  }

  // Get the query param filter in the URL and updates the DOM
  private getQueryParamsFromURL(): void {
    const QUERY_SUBSCRIPTION = this.activateRoute.queryParamMap.subscribe(params => {
      // Categories
      if (params.getAll('categories').length > 0)
      this.updateFormDinamicallyFromURL(this.form_filter_categories, params.getAll('categories'));
      // Countries
      if (params.getAll('countries').length > 0)
      this.updateFormDinamicallyFromURL(this.form_filter_countries, params.getAll('countries'));
      // Price
      if (params.getAll('price').length > 0) 
        for (const KEY in this.form_filter_price.value)
          this.form_filter_price.get('price')?.patchValue(params.getAll('price')[0]);
      // Condition
      if (params.getAll('condition').length > 0)
        this.updateFormDinamicallyFromURL(this.form_conditions, params.getAll('condition'));
      // Sort
      for (const KEY in this.form_filter_sort_by.value)
        if (params.getAll('sort_by').length > 0) 
          this.form_filter_sort_by.get('sort_by')?.patchValue(params.getAll('sort_by')[0]);
    });
    // Unsubscribe to avoid a infinite loop of apply filters
    QUERY_SUBSCRIPTION.unsubscribe();
  }

  // Get into local storage the filter location
  private async getFilterLocation() {
    await this.localStorageService.getItem('filter_location')
      .then((resp: any) => { 
        if(resp.lat && resp.lng) this.search_location = resp;
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
        slug: 'price_' + steps[index - 1] + '-' + steps[index],
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
          this.form_filter_categories.addControl(iterator.slug, new UntypedFormControl(false));
          break;
        case 'country':
          this.form_filter_countries.addControl(iterator.isoCode, new UntypedFormControl(false));
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
   * @param form the forms that contains the data for a certain filter
   * @param type_form describes the type of form-filter we are checking
   * @param url_params all query params read in the URL
   */
  private updateFormDinamicallyFromURL(form: any, url_params: any): void {
    for (const FORM_SLUG in form.value)
      if (url_params.includes(FORM_SLUG))
        form.get(FORM_SLUG)?.patchValue(true);
  }

  // Subscribe to all forms to detect changes, if change are apply it will update the filters
  private subscribeToForms(): void {
    this.form_conditions.valueChanges.subscribe(value => { this.getFilters() });
    this.form_filter_sort_by.valueChanges.subscribe(value => { this.getFilters() });
    this.form_filter_price.valueChanges.subscribe(value => { this.getFilters() });
    this.form_filter_countries.valueChanges.subscribe(value => { this.getFilters() });
    this.form_filter_categories.valueChanges.subscribe(value => { this.getFilters() });
  }

  // Read all forms and gather the applied filters in one object to construct the URL params
  private getFilters(): void {
    this.filters_applied = { status: 'accepted', page: this.page_current, limit: this.page_limit, search_text: this.search_text, countries: [], categories: [], condition: [], price: '', sort_by: '', location: JSON.stringify(this.search_location) };
    for (const KEY in this.form_conditions.value)
      if (this.form_conditions.value[KEY]) this.filters_applied.condition.push(KEY);
    for (const KEY in this.form_filter_sort_by.value)
      this.filters_applied.sort_by = this.form_filter_sort_by.value[KEY];
    for (const KEY in this.form_filter_price.value)
      this.filters_applied.price = this.form_filter_price.value[KEY];
    for (const KEY in this.form_filter_categories.value)
      if (this.form_filter_categories.value[KEY]) this.filters_applied.categories.push(KEY);
    for (const KEY in this.form_filter_countries.value)
      if (this.form_filter_countries.value[KEY]) this.filters_applied.countries.push(KEY);
    this.navigateToURLWithFilters();
    this.sendFiltersToParent();
  }

  public sendFiltersToParent() {
    this.emitFilters.emit(this.filters_applied)
  }

  // Reload the page with the new filters as queryparams on the URL
  private navigateToURLWithFilters(): void {
    this.router.navigate(['/products/all'], { queryParams: this.filters_applied });
  }

  public openModalChangeSearchLocation():void {
    const modalRef = this.modalService.open(MapSelectRadiusComponent, this.ng_modal_options);
    modalRef.componentInstance.close_callback = () => {};
  }

  // Clear all filters
  public clearFilters(): void {
    this.form_filter_price.reset()
    this.form_filter_sort_by.reset()
    this.form_filter_price.reset()
    this.form_filter_countries.reset()
    this.form_filter_categories.reset()
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
