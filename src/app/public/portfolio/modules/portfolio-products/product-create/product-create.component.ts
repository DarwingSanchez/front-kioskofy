import { Component, OnInit, SecurityContext } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { faFilm, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { Category } from 'src/app/core/interfaces/category.interface';
import { Country } from 'src/app/core/interfaces/country.interface';
import { Product } from 'src/app/core/interfaces/product.interface';
import { SubCategory } from 'src/app/core/interfaces/subcategory.interface';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { CountriesService } from 'src/app/core/services/countries/countries.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { MapService } from 'src/app/core/services/map/map.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { ResorcesService } from 'src/app/core/services/resources/resorces.service';
import { SubCategoriesService } from 'src/app/core/services/sub-categories/subcategories.service';
import { LoadingComponent } from 'src/app/modal/loading/loading.component';
import { MapLocationComponent } from 'src/app/modal/map-location/map-location.component';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

interface ImageItem {
  file: File | Blob;
  image64: string | ArrayBuffer
}

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  // Icons
  public icon_image = faImage;
  public icon_film = faFilm;
  public icon_trash = faTrash;
  // Countries
  public countries: Country[] = [];
  public country_selected!: Country;
  // Categories
  public categories: Category[] = [];
  public subcategories: SubCategory[] = [];
  public category_selected!: Category;
  // Formularios reactivos
  public product_form: UntypedFormGroup;
  // Modal configuration
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  // Options for the Form
  public conditions = [{ key: 'New', value: 'new' }, { key: 'Used', value: 'used' }, { key: 'Not specified', value: 'not_specified' } ];
  public measures = ['Un', 'Kg', 'gr', 'Lb', 'Pound', 'Other'];
  public MAX_PICKUP_LOCS = 20;
  public pickup_locations: any[] = []
  public main_loc_marker = './assets/icons/map_marker_main_location.png'
  // Images and video
  public images_list: ImageItem[] = [];
  public img_format_error = false;
  public supported_imgs: string[] = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private productsService: ProductsService,
    private resorcesService: ResorcesService,
    private localStorageService: LocalStorageService,
    private mapService: MapService,
    private countriesService: CountriesService,
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService,
    public activeModal: NgbActiveModal,
  ) {
    this.product_form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^.{1,50}$/)]],
      images: [null, Validators.required],
      status: ['accepted', Validators.required],
      seller: ['', Validators.required],
      price: [null, Validators.required],
      condition: ['', Validators.required],
      stock: [null, Validators.required],
      category: ['', Validators.required],
      sub_category: ['', Validators.required],
      country: ['', Validators.required],
      start_up: [false, Validators.required],
      non_profit: [false, Validators.required],
      hand_craft: [false, Validators.required],
      recommended: [false, Validators.required],
      best_seller: [false, Validators.required],
      trending: [false, Validators.required],
      description: ['', [ Validators.required ]],
      pickup_locations: [null, Validators.required],
      pickup_main_location: [null, Validators.required],
      pickup_country: ['', Validators.required],
      pickup_administrative_area_level_1: ['', Validators.required],
    });
  }

  async ngOnInit() {
    try {
      this.getLoggedUserID();
      this.getCountries();
      await this.getCategories();
      this.getSubCategories(this.categories[0]._id);
    } catch (error) {
      this.alertUser('warning', '¡Oh oh!', 'Sorry, we are experiencing some problems.');
    }
  }

  // Get the ID of the logged in user to save fthe product under his/her ID
  public getLoggedUserID(): void {
    this.localStorageService.getItem('user')
      .then((resp: any) => {
        if (Object.keys(resp).length)
          this.product_form.patchValue({seller: resp._id});
        else {
          this.alertUser('warning', '¡Oh oh!', 'In order to sell items, you must first login.', );
          // this.modalService.open(LoginComponent, this.ng_modal_options);
        }
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Get all available countries
  public getCountries(): void {
    lastValueFrom(this.countriesService.getCountries())
      .then((resp: any) => {
        if(resp.success && resp.data) this.countries = resp.data
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Get all active categories
  public async getCategories() {
    await lastValueFrom(this.categoriesService.getCategoriesByStatus('active'))
      .then((resp: any) => {
        if(resp.success && resp.data) this.categories = resp.data
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Get all active categories
  public getSubCategories(category: any): void {
    lastValueFrom(this.subCategoriesService.getSubCatsByStatusAndCategory('active', category))
      .then((resp: any) => {
        if(resp.success && resp.data) this.subcategories = resp.data
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Save product into database
  public async saveProduct() {
    const modal_loading = this.openLoaderComponent('Please wait one moment', '');
    try {
      await this.saveMapLocationsIntoForm();
      await this.uploadImages();
      this.parsePriceToNumber();
      console.log('Product', this.product_form);
      if (!this.isValidForm()) {

      };
      const PRODUCT: Product = this.product_form.value;
      await lastValueFrom(this.productsService.createProduct(PRODUCT))
      .then((resp: any) => {
        modal_loading.close();
        if(resp.success && resp.data) {
          this.alertUser('success', '¡Great!', 'Your product has been created');
          this.product_form.reset();
          this.images_list = [];
          window.location.reload();
        };
      })
    } catch (error) {
      this.alertUser('warning', '¡Oh oh!', 'There was a problem, please try again later');
      modal_loading.close();
      console.error('Error creating product: ', error);
    }
  }

  // If form is not complete/correct, marks errors and exit
  private isValidForm(): boolean {
    if (this.product_form.invalid) {
      this.product_form.markAllAsTouched();
      return false;
    } else {
      return true;
    }
  }

  // Correct price from tye string to number
  private parsePriceToNumber(): void {
    if (this.product_form.value.price === null) return;
    this.product_form.value.price = parseInt(this.product_form.value.price.toString().replace(/[CA$,.]/g, ''));
    return;
  }

  // Select the first location as main location
  private async saveMapLocationsIntoForm() {
    if (!this.pickup_locations.length) return;
    this.product_form.patchValue({
      pickup_locations: this.pickup_locations,
      pickup_main_location: this.pickup_locations[0],
    });
    await this.getAddressMainLocation(this.pickup_locations[0].lat, this.pickup_locations[0].lng);
  }

  // Show details of the location selected in the DOM
  public showLocationDetail(event: any, index: number): void {
    const modalRef = this.modalService.open(MapLocationComponent, this.ng_modal_options);
    modalRef.componentInstance.lat = event.latitude;
    modalRef.componentInstance.lng = event.longitude;
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.callbackDeleteLocation = (lat: number, lng: number) => {
      this.removeLocation(lat, lng);
    };
    modalRef.componentInstance.callbackSelectMainLocation = (lat: number, lng: number, is_main_location: boolean) => {
      if (is_main_location) this.selectMainLocation(lat, lng);
    };
  }

  // Add pickup locations for the product
  public async addLocation(event: any) {
    if (this.pickup_locations === null) this.pickup_locations = []; // Initialize array if doesn't exist
    if (this.pickup_locations.length >= this.MAX_PICKUP_LOCS) return;
    this.pickup_locations.push({ lat: event.coords.lat, lng: event.coords.lng})
  }

  // Get the address based on a lat. lng. using the google api
  public async getAddressMainLocation(lat: number, lng: number) {
    let latlng: string = lat.toString() + ',' + lng.toString();
    await lastValueFrom(this.mapService.getAddreesByLatLong(latlng))
      .then((resp: any) => {
        if (resp.status === "OK" && resp.results.length > 0)
          for (const iterator of resp.results) {
            if (iterator.types.includes('country')) this.product_form.patchValue({pickup_country: iterator.formatted_address });
            if (iterator.types.includes('administrative_area_level_1')) this.product_form.patchValue({pickup_administrative_area_level_1: iterator.formatted_address });
          }
        else throw new Error();
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Remove location based on lat and lng
  private removeLocation(lat: number, lng: number): void {
    this.pickup_locations = this.pickup_locations.filter((location: any) => {
        return location.lat !== lat && location.lng !== lng;
    });
  }

  // Select one location as main location
  private selectMainLocation(lat: number, lng: number): void {
    let current_index = this.pickup_locations.findIndex((location: any) => {
      return location.lat === lat && location.lng === lng;
    });
    // Not need to swapp if already in the correct pos.
    if (current_index <= 0) return
    // Swapp with first/main position
    [this.pickup_locations[0], this.pickup_locations[current_index]] =
      [this.pickup_locations[current_index], this.pickup_locations[0]];
  }

  // Get the image from the DOM and validates if it supported and save it in the array
  async handleFileInput(event: any) {
    const number_images = 4;
    let list = await event.target.files;
    if (!event || !list) return;
    // Validate if image is supported
    const file_end: string = list[0].name.trim().toLowerCase().split('.');
    if (!this.supported_imgs.includes(file_end[1])) { this.img_format_error = true; return };
    // Max 4 images accepted
    if (this.images_list.length > number_images) return;
    for (const iterator of list) {
      if (!iterator) continue
      let reader = new FileReader();
      reader.onload = (event) => {
        if (event && event.target) {
          const imageBase64: any  = event.target.result || '';
          const imageItem: ImageItem = { file: iterator, image64: imageBase64 };
          this.images_list.push(imageItem);
        };
      };
      reader.readAsDataURL(iterator)
    }
  }

  // Creates a Gallery from a Blob array
  public async uploadImages() {
    if (!this.images_list.length) return;
    let files: File[] = [];
    for (const iterator of this.images_list)
      if (iterator.file instanceof File) files.push(iterator.file)
    await lastValueFrom(this.resorcesService.loadImgPortfolio(files))
      .then((resp: any) => {
        if (resp && resp.success && resp.data.length) this.product_form.patchValue({ images: resp.data });
        else throw new Error('Error when uploading images');
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Remove image from array selected
  deleteImage(index: number) {
    this.images_list.splice(index, 1)
  }

  // Open modal to alert the user
  private alertUser(img_flag: string, title: string, msg: string): void {
    const modalRef = this.modalService.open(SimpleAlertComponent, this.ng_modal_options);
    modalRef.componentInstance.img_src = img_flag;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.btn_msg = 'Volver';
    modalRef.componentInstance.close_callback = () => {};
  }

  // Open modal to alert the user
  private openLoaderComponent(title: string, msg: string) {
    const modalRef = this.modalService.open(LoadingComponent, this.ng_modal_options);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    return modalRef;
  }

  //Find an object from an array based on property _id
  public findObjectById(flag: string, array: any[], _id: string) {
    let result = array.find(obj => { return obj._id === _id })
    if (flag === 'country') this.country_selected = result;
    else if (flag === 'category') this.category_selected = result;
    return result;
  }
}
