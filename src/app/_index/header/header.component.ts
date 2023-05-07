import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
// import { faShoppingCart, faBars, faUser, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { map, startWith } from 'rxjs';
import { LoginComponent } from 'src/app/modal/login/login.component';
import { SignupComponent } from 'src/app/modal/signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //Evita que al hacer click por fuera se cierre el modal
  private ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    keyboard: false,
    size: 'lg',
  };
  productcounter = 0;

  // Guardamos dinamicamente los valores de autocompletado
  public filteredOptions: any;
  public mySearch = new FormControl();
  public searchTerm = '';
productos_filtrados: any;

  public currentPosition = window.pageYOffset;

  constructor(@Inject(DOCUMENT) private _document: Document, private modalService: NgbModal) {
    this._document.addEventListener('scroll', this.onContentScrolled);
  }

  public signUpUser(): void {
    const modalRef = this.modalService.open(SignupComponent, this.ngbModalOptions);
    modalRef.componentInstance.close_callback = () => {};
  }

  public loginUser(): void {
    const modalRef = this.modalService.open(LoginComponent, this.ngbModalOptions);
    modalRef.componentInstance.close_callback = () => {};
  }

  onContentScrolled = (e: any) => {
    let scroll = window.pageYOffset;
    // console.log('scroll', scroll, 'this.currentPosition', this.currentPosition, 'this.flag_scroll_up', this.flag_scroll_up);
    
    if (scroll > this.currentPosition && this.flag_scroll_up) {
      // console.log('scrollDown');
      this.flag_scroll_up = false;
    } else if(scroll < this.currentPosition && !this.flag_scroll_up){
      // console.log('scrollUp');
      this.flag_scroll_up = true;
    }
    this.currentPosition = scroll;
  }
  flag_scroll_up = true;

  public isMenuCollapsed = true;

  ngOnInit(): void {
    // console.log('works');
  }

 /**
   * Este metodo tiene como objetoautocompletar la busqueda del usuario
   */
  autoCompletadoBusqueda() {
    this.filteredOptions = this.mySearch.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      map((nombre) => (nombre ? this._filter(nombre) : this.productos_filtrados.slice()))
    );
  }

  displayFn(user: any) {
    // console.log(user ? user.value : '');
    return user ? user.nombre : undefined;
  }

  returnFn(user: any) {
    return user ? user.value : undefined;
  }

  itemDisplayFn(item: any) {
    return item ? item.name : '';
  }

  private _filter(nombre: string) {
    const filterValue = this.normalizeString(nombre.toLowerCase());
    return this.productos_filtrados.filter(
      (option: any) => this.normalizeString(option.nombre).toLowerCase().indexOf(filterValue) === 0
    );
  }

  clearSearch() {
    this.searchTerm = '';
  }

    /**
   * Toma el string que entra por parámetro y cambia tildes y diéresis
   * por las letras sin acento, y lo pasa a minúsculas
   * @param pWord El string a filtrar
   * @returns El string filtrado
   */
  normalizeString(pWord: string): string {
    return pWord
      .trim()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase();
  }
  public openLink(link: any) {
    window.open(link, '_blank');
  }
}
