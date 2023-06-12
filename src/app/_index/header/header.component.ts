import { Component, OnInit } from '@angular/core';
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
  private ng_modal_options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    keyboard: false,
    size: 'lg',
  };

  // Guardamos dinamicamente los valores de autocompletado
  public filteredOptions: any;
  public mySearch = new FormControl();
  public searchTerm = '';
productos_filtrados: any;


  constructor(private modalService: NgbModal) {}

  // Open modal to sign up an user
  public signUpUser(): void {
    const modalRef = this.modalService.open(SignupComponent, this.ng_modal_options);
    modalRef.componentInstance.close_callback = () => {};
  }

  // Open modal to login an user
  public loginUser(): void {
    const modalRef = this.modalService.open(LoginComponent, this.ng_modal_options);
    modalRef.componentInstance.close_callback = () => {};
  }


  
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
