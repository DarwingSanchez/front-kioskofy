import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-portfolio-filters',
  templateUrl: './portfolio-filters.component.html',
  styleUrls: ['./portfolio-filters.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PortfolioFiltersComponent implements OnInit {
  // Filers applied by user
  public filters_applied: any = {
    condition: [],
    price: '',
    sort_by: '',
  }
  public sort_list = [
    {
      name: 'Name: Ascendent',
      slug: 'name_1',
    },
    {
      name: 'Name: Descendent',
      slug: 'name_-1',
    },
    {
      name: 'Price: Lowest first',
      slug: 'price_1',
    },
    {
      name: 'Price: Highest first',
      slug: 'price_-1',
    },
    {
      name: 'Distance: Nearest first',
      slug: 'distance_1',
    },
    {
      name: 'Date listed: Newest first',
      slug: 'creadedAt_1',
    }
  ]
  public condition_list = [
    {
      name: 'New',
      slug: 'new',
    },
    {
      name: 'Used',
      slug: 'used',
    },
    {
      name: 'Not specified',
      slug: 'unknown',
    },
  ]
  public price_list = [
    {
      name: 'All',
      slug: 'price|0-90000000',
    },
    {
      name: '$0 - $50',
      slug: 'price|0-50',
    },
  ]
  public categories = ['Hola', 'Hola', 'Hola', 'Hola', 'Hola', 'Hola', 'Hola', 'Hola', 'Hola', 'Hola', 'Hola', 'Hola', 'Hola', ];
  public deliveries = { pickup: 'Safe pick up', delivery: 'Deliver to your home',  ship: 'Nation wide shipping'};
  public form_conditions = this._formBuilder.group({
    new: false,
    used: false,
    unknown: false,
  });
  public form_sort_by = this._formBuilder.group({
    sort_by: '',
  });
  public form_price = this._formBuilder.group({
    price: '',
  });
    
    constructor(private _formBuilder: FormBuilder, private router: Router, private activateRoute: ActivatedRoute) {}
  test1 = 240;
  test2 = 13042;
  test3 = 92352123;
  test4 = 723.134;
    ngOnInit(): void {
// this.getPriceFilterRanges(this.test1);
this.getPriceFilterRanges(this.test2);
// this.getPriceFilterRanges(this.test3);
// this.getPriceFilterRanges(this.test4);
this.getQueryParamsFromURL();
this.subscribeToForms();

  }

  getQueryParamsFromURL() {
      let query_param_subscription = this.activateRoute.queryParamMap.subscribe(params => {
        // All filters applied as input to the data fetch
        // Update all filters in DOM
        for (const KEY in this.form_conditions.value) {
          if (params.getAll('condition').includes(KEY)) 
            this.form_conditions.get(KEY)?.patchValue(true);
        }
        for (const KEY in this.form_price.value) {
          if (params.getAll('price').length > 0) 
            this.form_price.get('price')?.patchValue(params.getAll('price')[0]);
        }
        for (const KEY in this.form_sort_by.value) {
          if (params.getAll('sort_by').length > 0) 
            this.form_sort_by.get('sort_by')?.patchValue(params.getAll('sort_by')[0]);
        }
      });
      // Unsubscribe tto avoid a infinite loop of apply filters
      query_param_subscription.unsubscribe();
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
   * Subscribe to all forms to detect changes
   * If change are apply it will update the filters
   */
  subscribeToForms() {
    this.form_conditions.valueChanges.subscribe(value => { this.getFilters() });
    this.form_sort_by.valueChanges.subscribe(value => { this.getFilters() });
    this.form_price.valueChanges.subscribe(value => { this.getFilters() });
  }

  /**
   * Read all forms and get the 
   */
  getFilters() {
    // Reset filters to avoid duplication
    this.filters_applied = { condition: [], price: '', sort_by: '' };
    // Read each form group and get the filters applied
    for (const KEY in this.form_conditions.value) {
      if (this.form_conditions.value[KEY]) this.filters_applied.condition.push(KEY);
    }
    for (const KEY in this.form_sort_by.value) {
      this.filters_applied.sort_by = this.form_sort_by.value[KEY];
    }
    for (const KEY in this.form_price.value) {
      this.filters_applied.price = this.form_price.value[KEY];
    }
    this.navigateToURLWithFilters();
  }
  
  /**
   * Reload the page with the new filters as queryparams on the URL
   */
  navigateToURLWithFilters() {
    this.router.navigate(['/products/all'], { queryParams: this.filters_applied });
  }
}
