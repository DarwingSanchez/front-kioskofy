import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/core/interfaces/category.interface';
import { Country } from 'src/app/core/interfaces/country.interface';
import { Product } from 'src/app/core/interfaces/portfolio/product.interface';
import { FONT_AWESOME_ICONS } from 'src/app/core/constants/icons';
import { FavoritesService } from 'src/app/core/services/favorites/favorites.service';
import { User } from 'src/app/core/interfaces/user.interface';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-card-complete',
  templateUrl: './card-complete.component.html',
  styleUrls: ['./card-complete.component.css']
})
export class CardCompleteComponent implements OnInit, OnChanges {
  @Input() portfolio!: Product;
  @Input() user_id!: string;
  @Input() user!: User;
  @Input() category!: Category;
  @Input() country!: Country;
  @Input() show_swiper: boolean = false;
  public price = 0;
  public is_liked_by_user: boolean = false;
  public icon_fire = faFire;
  public readonly FONT_AWESOME_ICONS = FONT_AWESOME_ICONS;

  constructor(private _favoritesService: FavoritesService, private _router: Router) {}

  ngOnInit(): void {
    this.is_liked_by_user = this.user.favorites.includes(this.portfolio._id);
  }

  ngOnChanges(): void {
    // In case the price comes with the currency it must be corrected
    if (this.portfolio && this.portfolio.price)
      this.price = parseInt(this.portfolio.price.toString().replace(/[CA$,.]/g, ''));
  }

  // Add the item as favorite for the user
  public likedCard(): void {    
    lastValueFrom(this._favoritesService.addUserFavorite(this.user_id, this.portfolio._id))
      .then((resp: any) => {
        window.location.reload();
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Open portfolio item in a new tab
  public openItem(): void {
    const url = this._router.createUrlTree(['/products/detail', this.portfolio.slug])
    window.open(url.toString(), '_blank')
  }
}
