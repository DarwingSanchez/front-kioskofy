import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faBars, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom, map, startWith } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
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

  /** Saves size screen */
  public sizeScreen: number = 0;
  /** Controller when it is mobile screen */
  public isMobile: boolean = false;
  /**
   * Knows when the menu is opened or closed
   * true = menu is closed,
   * false = menu is opened
   */
  public isMenuCollapsed = true;

  /** Search text */
  public searchText: string = '';
  /** Search loading controller */
  public loadingSearch: boolean = false;
  /** Search result list  */
  public searchResultList: any[] = [];
  /** search list modal  */
  public searchModal: boolean = false;
  // Used to avoid searching for results while user typing
  public typingTimer: any;


  // Screen size
  public innerWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sizeScreen = window.innerWidth;
    this.onDetectMobile();
  }
  // User icon from free solid icons
  public icon_user = faUser;
  // Bars icon from free solid icons
  public icon_bars = faBars;
  // Search icon from free solid icons
  public icon_search = faSearch;
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
    private productServe: ProductsService
    ) {
      this.sizeScreen = window.innerWidth;
      this.onDetectMobile();
    }

  /**
   * Checks if the current Screen size is actually a mobile
   * @returns
   */
  onDetectMobile() {
    if (this.sizeScreen <= 900) {
      this.isMobile = true;
      return;
    }
    this.isMobile = false;
  }

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

  /**
   * Sets the interval time to make the request once the user press a kep-up
   * @returns
   */
  onIntervalSearch() {
    this.loadingSearch = true;
    this.searchModal = true;
    clearTimeout(this.typingTimer);
    if(this.searchText){
      this.typingTimer = setTimeout(() => this.onSearch(), 500)
      return
    }
    this.loadingSearch = false
  }

  /**
   * Search bar suggestions
   */
  onSearch() {
    this.productServe.onSearchProductsBar(this.searchText).subscribe({
      next: data => {
        this.loadingSearch = false;
        if (data?.success) {
          this.searchResultList = JSON.parse(JSON.stringify(data.data.list));
        }
      },
      error: error => {
        this.loadingSearch = false;
        console.error('Error getting bar search list', error);
      }
    })
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

  /**
   * Redirect user to product detail
   */
  public openLink(productInfo: any) {
    // will redirect to product detail
  }
}
