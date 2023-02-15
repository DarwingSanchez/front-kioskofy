import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faBars, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /** Iconos FontAwesome para usar en el template */
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faBars = faBars;

  productcounter = 0;

  constructor() {}

  public isMenuCollapsed = true;

  ngOnInit(): void {}

  public verDocumento(link: any) {
    window.open(link, '_blank');
  }
}
