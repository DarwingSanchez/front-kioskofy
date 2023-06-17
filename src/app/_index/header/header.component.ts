import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom, map, startWith } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { LoginComponent } from 'src/app/public/auth/login/login.component';
import { SignupComponent } from 'src/app/public/auth/signup/signup.component';
import { UserComponent } from 'src/app/public/user/user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public icon_user = faUser;
  public icon_bars = faBars;
  public user_logged!: any;
  private ng_modal_options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    keyboard: false,
    size: 'lg',
  };

  constructor(
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private usersService: UsersService,
    ) {}

  async ngOnInit() {
    try {
      await this.getUserID();
    } catch (error) {}
  }

  // Get the user ID from LS
  private getUserID(): any {
    this.localStorageService.getItem('user')
      .then((resp: any) => { 
        if(resp._id && resp._id !== null) this.getUserByID(resp._id);
      }).catch((error) => {
        throw error;
      })
  }

 // Get the data for the user based on its ID
  public getUserByID(id: string) {
    lastValueFrom(this.usersService.getUserById(id))
      .then((resp: any) => {
        if(resp.success && resp.data && resp.data !== null) this.user_logged = resp.data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

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

  // Open modal to see the logged user's details
  public seeUserData(): void {
    const modalRef = this.modalService.open(UserComponent, this.ng_modal_options);
    modalRef.componentInstance.close_callback = () => {};
  }
  // Guardamos dinamicamente los valores de autocompletado
  public filteredOptions: any;
  public mySearch = new FormControl();
  public searchTerm = '';
productos_filtrados: any;


  public isMenuCollapsed = true;

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
