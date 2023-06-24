import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { Country } from 'src/app/core/interfaces/country.interface';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';
import { SimpleComponent } from 'src/app/modal/simple/simple.component';
import { CountriesService } from 'src/app/core/services/countries/countries.service';
import { ResorcesService } from 'src/app/core/services/resources/resorces.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Category } from 'src/app/core/interfaces/category.interface';
import { Product } from 'src/app/core/interfaces/product.interface';
import { MapService } from 'src/app/core/services/map/map.service';
import { MapLocationComponent } from 'src/app/modal/map-location/map-location.component';

interface ImageItem {
  file: File | Blob;
  imageChangedEvent: any;
  croppedImage: any;
}

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  // Countries
  public countries: Country[] = [];
  public country_selected!: Country;
  // Categories
  public categories: Category[] = [];
  public category_selected!: Category;
  // Formularios reactivos
  public product_form: FormGroup;
  // Modal configuration
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  // Options for the Form
  public conditions = ["New", "Used", "Not specified"];
  public measures = ["Unit", "Kgr", "gr", "Pound", "Other"];
  public MAX_PICKUP_LOCS = 20;
  public pickup_locations: any[] = []
  public main_loc_marker = './assets/icons/map_marker_main_location.png'

  // Variables para el manejo de las fotos y sus miniaturas
  public imgs: Blob[] = [];
  public imgs_path: SafeUrl[] = [];
  public file_fotos: (File | undefined)[] = [];
  public fotos: (SafeUrl | string)[] = [];
  public img_format_error = false;
  public error_formato_img = false;
  public error_max_imgs = false;
  public supported_imgs: string[] = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private productsService: ProductsService,
    private resorcesService: ResorcesService,
    private sanitizer: DomSanitizer,
    private countriesService: CountriesService,
    private categoriesService: CategoriesService,
    
  ) {
    this.product_form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^.{1,50}$/)]],
      images: ['', Validators.required],
      status: ['accepted', Validators.required],
      seller: ['645847ecb606ee6d6fb30608', Validators.required],
      price: [null, Validators.required],
      measure: ['Unit', Validators.required],
      quantity: [null, Validators.required],
      condition: ['', Validators.required],
      stock: [null, Validators.required],
      category: ['', Validators.required],
      country: ['', Validators.required],
      start_up: [false, Validators.required],
      non_profit: [false, Validators.required],
      recommended: [false, Validators.required],
      description: ['', [Validators.required, Validators.pattern(/^.{1,300}$/)]],
      pickup_locations: [null, Validators.required],
      main_location: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.product_form.patchValue({
      images: [
        this.img_dummys[Math.floor(Math.random() * ((this.img_dummys.length - 1) - 0 + 1) + 0)],
        this.img_dummys[Math.floor(Math.random() * ((this.img_dummys.length - 1) - 0 + 1) + 0)],
        this.img_dummys[Math.floor(Math.random() * ((this.img_dummys.length - 1) - 0 + 1) + 0)],
        this.img_dummys[Math.floor(Math.random() * ((this.img_dummys.length - 1) - 0 + 1) + 0)],
      ]
    });
    try {
      this.getCountries();
      this.getCategories();
    } catch (error) {
      this.alertUSer('warning', '¡Oh oh!', 'Sorry, we are experiencing some problems.');
    }
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
  public getCategories(): void {
    lastValueFrom(this.categoriesService.getCategoriesByStatus('active'))
      .then((resp: any) => {
        if(resp.success && resp.data) this.categories = resp.data
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Save product into database
  public async saveProduct() {
    console.log('entra');
    
    // if (!this.isValidForm()) return;
    this.saveMapLocationsIntoForm();
    this.parsePriceToNumber();
    const PRODUCT: Product = this.product_form.value;
    console.log(PRODUCT);
    await lastValueFrom(this.productsService.createProduct(PRODUCT))
    .then((resp: any) => {
      if(resp.success && resp.data) {
        this.alertUSer('success', '¡Great!', 'Your product has been created');
        this.product_form.reset();
      };
    })
    .catch((error: Error) => {
      this.alertUSer('warning', '¡Oh oh!', 'There was a problem, please try again later');
      throw error;
    });
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
    this.product_form.value.price = parseInt(this.product_form.value.price.toString().replace(/[CA$,.]/g, ''));
    return;
  }

  // Select the first location as main location
  private saveMapLocationsIntoForm(): void {
    this.product_form.patchValue({
      pickup_locations: this.pickup_locations,
      main_location: this.pickup_locations[0],
    });
  }

  // Open modal to alert the user
  private alertUSer(img_flag: string, title: string, msg: string): void {
    const modalRef = this.modalService.open(SimpleComponent, this.ng_modal_options);
    modalRef.componentInstance.lat = img_flag;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.btn_msg = 'Volver';
    modalRef.componentInstance.close_callback = () => {};
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
  public addLocation(event: any): void {
    if (this.pickup_locations === null) this.pickup_locations = []; // Initialize array if doesn't exist
    if (this.pickup_locations.length >= this.MAX_PICKUP_LOCS) return;
    this.pickup_locations.push({ lat: event.coords.lat, lng: event.coords.lng})
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

  //Find an object from an array based on property _id
  public findObjectById(flag: string, array: any[], _id: string) {
    let result = array.find(obj => { return obj._id === _id })
    if (flag === 'country') this.country_selected = result; 
    else if (flag === 'category') this.category_selected = result;
    return result;
  }

  /**
   * Guarda las imagenes cargadas por el usuario al producto
   */
  savePictures(_id: string, cod_ft: string) {
 
//     /** Gestiona las imagenes del producto **/
//     const upload_form: FormData = new FormData();
//     let i = 1;
//     let images: Blob[] = [];

// for (const iterator of this.selectedImages) {
//   images.push(iterator);
// }
    /** Guarda las imagenes en AWS */
    // for (const img_aux of this.imgs) {
    //   console.log(img_aux, i);
    //   upload_form.append('', img_aux);
    //   console.log('****', upload_form, upload_form.get(''));
    //   i++;
    // }
        const dto = new FormData();
    for (const iterator of  this.imgs) {
      dto.append('', iterator)
      console.log(iterator);
      
      console.log('dto', dto);
    }
    console.log(dto, this.imgs, dto.getAll(''));
    
    // /** Guarda las fotos */
    // this.resorcesService
    //   .loadImgPortfolio(this.imgs)
    //   .toPromise()
    //   .then((resp: any) => {
    //     console.log(resp);
        
    //     // const nuevas_url: string[] = [];
    //     // let i = 0;
    //     // for (const str_path of this.fotos) {
    //     //   if (this.file_fotos[i] == undefined && typeof str_path === 'string') {
    //     //     nuevas_url.push(str_path);
    //     //   }
    //     //   i++;
    //     // }
    //     // for (const str_path of resp.logos) {
    //     //   nuevas_url.push(str_path);
    //     // }
    //     // this.producto!.fotos = nuevas_url;
    //     // /** Guarda objeto producto nuevo */
    //     // this.rest
    //     //   .putJWT('producto/' + _id, this.producto)
    //     //   .toPromise()
    //     //   .then((resp: any) => {
    //     //     this.openModal?.close();
    //     //     const modalRef = this.modalService.open(SimpleComponent, ngbModalOptions);
    //     //     modalRef.componentInstance.img_src = '../../../assets/img/icon-check-verde.png';
    //     //     modalRef.componentInstance.title = '¡Genial!';
    //     //     modalRef.componentInstance.msg = '¡Tu producto ha sido creado con éxito!';
    //     //     modalRef.componentInstance.btn_msg = 'Listo';
    //     //     modalRef.componentInstance.close_callback = () => {
    //     //       this.router.navigate(['/portafolio']);
    //     //     };
    //     //   });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // this.openModal?.close();
    //     // const modalRef = this.modalService.open(SimpleComponent, ngbModalOptions);
    //     // modalRef.componentInstance.img_src = '../../../assets/img/icon-warning-amarillo.png';
    //     // modalRef.componentInstance.title = '¡Oh oh!';
    //     // modalRef.componentInstance.msg =
    //     //   'Ocurrió un error cargando las nuevas fotos, sin embargo, tu producto fue creado sin estas, favor ve al detalle de este y agrega las imagenes correspondientes.';
    //     // modalRef.componentInstance.btn_msg = 'Volver';
    //     // modalRef.componentInstance.close_callback = () => {};
    //   });
  }

  /***************************************** Maneja las imagenes ****************************************/
  /**
   * Recibe un archivo del usuario y lo guarda
   * en el arreglo de imágenes del producto. Si
   * el archivo no tiene el formato correcto, no
   * se guarda y se muestra de error
   * @param event El evento generado al subir el archivo
   */
  handleFileInput(event: any) {
    this.img_format_error = false;
    const file: File = event.target.files[0];
    if (file != null) {
      const file_split: string[] = file.name.split('.');
      const file_end: string = file_split[file_split.length - 1].trim().toLowerCase();
      if (this.supported_imgs.includes(file_end)) {
        //Se está intentando subir un archivo de imagen
        this.imgs.push(file);
        this.imgs_path.push(
          this.sanitizer.sanitize(
            SecurityContext.NONE,
            this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.imgs[this.imgs.length - 1]))
          ) || ''
        );
      } else {
        this.img_format_error = true;
      }
    }
  }

  /**
   * Elimina del arreglo de URLs la foto con el índice indicado,
   * y si fue una foto agregada, también elimina el archivo subido
   * @param index La posición en los arreglos de fotos y de archivos
   * a eliminar
   */
  deleteImage(index: number) {
    this.imgs.splice(index, 1);
    this.imgs_path.splice(index, 1);
  }

  // /**
  //  * Transforma el dinero minimo de compra de número a moneda y viceversa
  //  * a moneda se utilizará para reemplazar el input y dar mejor UX al usuario
  //  * y a número plano para guardar el dato correctamente en la base de datos
  //  * ademas de poder editar mejor el valor en el input
  //  */
  // public transformCurrency(event: any) {
  //     this.product_form.patchValue({
  //       price: event.value.replace(/[^\d,-]/g, ''),
  //     });
  // }
  // public transformAmount(event: any) {
  //     this.product_form.patchValue({
  //       price: this.currencyPipe.transform(event.value, 'CAD', 'symbol', '1.0-0'),
  //     });
  // }
  // /**
  //  * Este metodo evita que en los inputs number se ingrese texto
  //  */
  // validateNumber(evento: any) {
  //   const keyCode = evento.keyCode;
  //   const excludedKeys = [8, 37, 3];
  //   if (
  //     !(
  //       keyCode == 190 ||
  //       (keyCode >= 48 && keyCode <= 57) ||
  //       (keyCode >= 96 && keyCode <= 105) ||
  //       excludedKeys.includes(keyCode)
  //     )
  //   ) {
  //     evento.preventDefault();
  //   }
  // }
  /**
   * Alerta si el formulario esta incompleto o un input es invalido
   */
  alertInvalidForm() {
    /** Formulario reactivo */
    this.product_form.markAllAsTouched();
    const modalRef = this.modalService.open(SimpleAlertComponent);
    modalRef.componentInstance.img_src = 'alert';
    modalRef.componentInstance.title = '¡Oh oh!';
    modalRef.componentInstance.msg = '¡Por favor asegúrate de llenar todos los datos y vuelve a intentarlo!';
    modalRef.componentInstance.btn_msg = 'Volver';
    modalRef.componentInstance.close_callback = () => {};
  }
toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  /** Saves the current uploaded picture to modify the aspect ratio */
  public selectedImages: ImageItem[] = [];

  onFileSelected(event: any) {
    let list =  Array.from((event.target as HTMLInputElement).files || []);
    if (!event || !list) return

    // // If the amount of pictures selected + the ones uploaded already is higher than 10, will be get only what if left to get 10 pictures
    // if ((list.length + this.productInfo.images.length) > 10) {
    //   const manyLeft = 10 - this.productInfo.images.length;
    //   list = list.splice(0, manyLeft);
    // }
    for (const iterator of list) {
      if (!iterator) continue
      let reader = new FileReader();
      reader.onload = (event) => {
        if (event && event.target) {
          const imageBase64  = event.target.result
          const imageItem: ImageItem = {
            file: iterator,
            imageChangedEvent: imageBase64,
            croppedImage: null
          };
          this.selectedImages.push(imageItem);
        };
      };
      reader.readAsDataURL(iterator)
    }
    console.log('this.selectedImages', this.selectedImages);
    
let temp: Blob[] = [];
    for (const iterator of this.selectedImages) {
          temp.push(iterator.file)
        }
    this.onCreateGallery(temp);
    // this.cropperModal = true;
    // this.removeFileList();
  }

    /**
   * Creates a Gallery from a Blob array
   * @param files | Blob Files
   * @returns
   */
  onCreateGallery(files: Blob[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.resorcesService.loadImgPortfolio(files).subscribe({
        next: (data: any) => {
          if (data && data.success && data.data) resolve(data.data);
          reject('Something went wrong');
        },
        error: (error) => {
          console.error('Error creating Gallery: ', error);
          reject(error);
        },
      });
    });
  }


  img_dummys = [
    'https://madeincolombia.com.co/wp-content/uploads/2017/11/Harina-Pan-Blanca-100-Grs-300x300.jpg',
    'https://www.elnuevosiglo.com.co/sites/default/files/styles/noticia_interna/public/2022-08/productos%20varios%20.jpeg',
    'https://cloudfront-us-east-1.images.arcpublishing.com/semana/TFMTFWLIJBDZVFE7PHB6P6QXVU.jpg',
    'https://inexportlogistic.com/wp-content/uploads/2020/09/frutino-salpicon.jpg',
    'https://www.publimetro.co/resizer/_hPL5Wbltj2BR3n0NJzF-INQsqs=/800x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/UXKIF4OZP5APLFTPG3RTPZ5X2Q.jpg',
    'https://magven.cl/wp-content/uploads/2021/02/barrilete-caramelo-masticable1-26e98b9241867f6f1715877886358365-640-0-320x320.jpg',
    'https://i.pinimg.com/474x/ce/6d/6b/ce6d6b2748e4f819e5f52a1418bc7a4c--colombia.jpg',
    'https://mandalomarket.com/wp-content/uploads/2021/02/Caramelos_Menta_Helada_Super_7702993035221_Mandalo_Spain-800x800.jpg',
    'https://lh3.googleusercontent.com/p/AF1QipOmji7m0hluvc2KhwQncE1fIWeVZU-DpJvYMwFr=s1280-p-no-v1',
    'https://www.laopinion.com.co/sites/default/files/inline-images/20221011_094019.jpg',
    'https://cdn.shopify.com/s/files/1/0498/7174/9287/products/69.-CHOCLITOS-20_1000x1000.jpg?v=1603635683',
    'https://tutiendalatina.es/839-home_default/arequipe-alpina-.jpg',
    'https://i0.wp.com/goula.lat/wp-content/uploads/2023/04/mcflurry-chocoramo.jpeg?resize=980%2C564&ssl=1',
    'https://www.iberoexpress.es/wp-content/uploads/2019/05/CPA015_pandebonos_estuche_2-500x500.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSATXk7V-_ks9aJ25KskMsshAZ1GCH6xKHtFQ&usqp=CAU',
    'https://diablitomarket.com/web/image/product.template/5653/image_1920/314x385?unique=5cb3c07',
    'https://www.tiendajuanvaldez.com/wp-content/uploads/2021/06/20230125_Banner-Ecommerce-capsulas_vertical-scaled.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPyvfdQ1x3UuHd7XTMSiYOnLEbJhEVk5XfDA&usqp=CAU',
    'https://d2j6dbq0eux0bg.cloudfront.net/images/29754353/3422309288.jpg',
    'https://enmanofood.com/wp-content/uploads/2021/08/Gomitas-pin%CC%83a-Italo.jpg',
    'https://http2.mlstatic.com/D_NQ_NP_994512-MLA46326472783_062021-O.webp',
    'https://mlv9ivfmf6rg.i.optimole.com/6OCBxFk-ffcbSOM8/w:1000/h:461/q:auto/https://www.dcarnilsa.com/wp-content/uploads/2022/03/Chorizo-colombiano.jpg',
    'https://escolombia.es/wp-content/uploads/2021/08/BD3.jpg',
    'https://colombianproducts.co/wp-content/uploads/2018/02/chiva.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZDhEadKO2qcu9y-loCiJU6-jTcdf_oZBtww&usqp=CAU',
    'https://d2j6dbq0eux0bg.cloudfront.net/images/30491376/1613734526.jpg'
  ]
}
