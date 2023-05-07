import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  // Variables para el manejo de las fotos y sus miniaturas
  public imgs: File[] = [];
  public imgs_path: SafeUrl[] = [];
  public file_fotos: (File | undefined)[] = [];
  public fotos: (SafeUrl | string)[] = [];
  public img_format_error = false;
  public error_formato_img = false;
  public error_max_imgs = false;
  public supported_imgs: string[] = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];
  // Formularios reactivos
  public product_form: FormGroup;
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
  };
  constructor(
    private currencyPipe: CurrencyPipe,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private productsService:ProductsService,
    private sanitizer: DomSanitizer
  ) {
    this.product_form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^.{1,50}$/)]],
      brand: ['', Validators.required],
      description: ['', [Validators.required, Validators.pattern(/^.{1,300}$/)]],
      country: ['', Validators.required],
      price: ['', Validators.required],
      measure: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
      sub_category: ['', Validators.required],
      stock: ['', Validators.required],
    });
    console.log(this.toppings);
    
  }

  ngOnInit(): void {
     this.product_form.patchValue({
        stock: 2,
      });
    console.log('servicios');
    // this.productsService
    //   .getProducts()
    //   .toPromise()
    //   .then((resp: any) => {
    //   console.log(':::::',resp);
      
    //   });
  }


  /**
   * Guarda las imagenes cargadas por el usuario al producto
   */
  guardarFotos(_id: string, cod_ft: string) {
 
    // /** Gestiona las imagenes del producto **/
    // const upload_form: FormData = new FormData();
    // let i = 1;
    // /** Guarda las imagenes en AWS */
    // for (const img_aux of this.imgs) {
    //   upload_form.append(`imagen${i}`, img_aux);
    //   i++;
    // }
    // /** Guarda las fotos */
    // this.rest
    //   .postJWT('recursos/producto/' + _id + '/' + cod_ft, upload_form)
    //   .toPromise()
    //   .then((resp: any) => {
    //     const nuevas_url: string[] = [];
    //     let i = 0;
    //     for (const str_path of this.fotos) {
    //       if (this.file_fotos[i] == undefined && typeof str_path === 'string') {
    //         nuevas_url.push(str_path);
    //       }
    //       i++;
    //     }
    //     for (const str_path of resp.logos) {
    //       nuevas_url.push(str_path);
    //     }
    //     this.producto!.fotos = nuevas_url;
    //     /** Guarda objeto producto nuevo */
    //     this.rest
    //       .putJWT('producto/' + _id, this.producto)
    //       .toPromise()
    //       .then((resp: any) => {
    //         this.openModal?.close();
    //         const modalRef = this.modalService.open(SimpleComponent, ngbModalOptions);
    //         modalRef.componentInstance.img_src = '../../../assets/img/icon-check-verde.png';
    //         modalRef.componentInstance.title = '¡Genial!';
    //         modalRef.componentInstance.msg = '¡Tu producto ha sido creado con éxito!';
    //         modalRef.componentInstance.btn_msg = 'Listo';
    //         modalRef.componentInstance.close_callback = () => {
    //           this.router.navigate(['/portafolio']);
    //         };
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.openModal?.close();
    //     const modalRef = this.modalService.open(SimpleComponent, ngbModalOptions);
    //     modalRef.componentInstance.img_src = '../../../assets/img/icon-warning-amarillo.png';
    //     modalRef.componentInstance.title = '¡Oh oh!';
    //     modalRef.componentInstance.msg =
    //       'Ocurrió un error cargando las nuevas fotos, sin embargo, tu producto fue creado sin estas, favor ve al detalle de este y agrega las imagenes correspondientes.';
    //     modalRef.componentInstance.btn_msg = 'Volver';
    //     modalRef.componentInstance.close_callback = () => {};
    //   });
  }
saveProduct(){
  console.log(this.product_form);
  if(this.imgs_path.length < 1 || this.product_form.invalid) {
    this.alertInvalidForm()
    return
  };
  this.productsService
      .createProduct(this.product_form.value)
      .toPromise()
      .then((resp: any) => {
        console.log(':::::',resp);
      
      })
      .catch((err) => {
        console.log(err);
    //     this.openModal?.close();
    //     const modalRef = this.modalService.open(SimpleComponent, ngbModalOptions);
    //     modalRef.componentInstance.img_src = '../../../assets/img/icon-warning-amarillo.png';
    //     modalRef.componentInstance.title = '¡Oh oh!';
    //     modalRef.componentInstance.msg =
    //       'Ocurrió un error cargando las nuevas fotos, sin embargo, tu producto fue creado sin estas, favor ve al detalle de este y agrega las imagenes correspondientes.';
    //     modalRef.componentInstance.btn_msg = 'Volver';
    //     modalRef.componentInstance.close_callback = () => {};
      });
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

  /**
   * Transforma el dinero minimo de compra de número a moneda y viceversa
   * a moneda se utilizará para reemplazar el input y dar mejor UX al usuario
   * y a número plano para guardar el dato correctamente en la base de datos
   * ademas de poder editar mejor el valor en el input
   */
  public transformCurrency(event: any) {
      this.product_form.patchValue({
        price: event.value.replace(/[^\d,-]/g, ''),
      });
  }
  public transformAmount(event: any) {
      this.product_form.patchValue({
        price: this.currencyPipe.transform(event.value, 'CAD', 'symbol', '1.0-0'),
      });
  }
  /**
   * Este metodo evita que en los inputs number se ingrese texto
   */
  validateNumber(evento: any) {
    const keyCode = evento.keyCode;
    const excludedKeys = [8, 37, 3];
    if (
      !(
        keyCode == 190 ||
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ) {
      evento.preventDefault();
    }
  }
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
}
