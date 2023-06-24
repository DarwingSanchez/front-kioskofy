import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgmCoreModule } from '@agm/core';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './_index/footer/footer/footer.component';
import { HeaderSearchBarComponent } from './_index/header/components/header-search-bar/header-search-bar.component';
import { SubHeaderComponent } from './_index/header/components/header-sub-header/sub-header.component';
import { HeaderUserAuthComponent } from './_index/header/components/header-user-auth/header-user-auth.component';
import { HeaderComponent } from './_index/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyFormatDirective } from './core/directives/currencyFormat/currency-format.directive';
import { LoadingComponent } from './modal/loading/loading.component';
import { MapLocationComponent } from './modal/map-location/map-location.component';
import { MapSelectPolygonComponent } from './modal/map-select-polygon/map-select-polygon.component';
import { MapSelectRadiusComponent } from './modal/map-select-radius/map-select-radius.component';
import { SimpleAlertComponent } from './modal/simple-alert/simple-alert.component';
import { LoginComponent } from './public/auth/login/login.component';
import { SignupComponent } from './public/auth/signup/signup.component';
import { BannerComponent } from './public/home/components/banner/banner.component';
import { HomeCategoriesComponent } from './public/home/components/home-categories/home-categories.component';
import { HomeExpansionPanelComponent } from './public/home/components/home-expansion-panel/home-expansion-panel.component';
import { HomeFourBannersComponent } from './public/home/components/home-four-banners/home-four-banners.component';
import { HomeMiddelBannerComponent } from './public/home/components/home-middel-banner/home-middel-banner.component';
import { HomeServicesComponent } from './public/home/components/home-services/home-services.component';
import { HomeStoresComponent } from './public/home/components/home-stores/home-stores.component';
import { HomeTwoBannersComponent } from './public/home/components/home-two-banners/home-two-banners.component';
import { MiddelBannerComponent } from './public/home/components/middel-banner/middel-banner.component';
import { WhatToDoComponent } from './public/home/components/what-to-do/what-to-do.component';
import { HomeComponent } from './public/home/home.component';
import { ProductCreateComponent } from './public/portfolio/components/portfolio-products/product-create/product-create.component';
import { ProductDetailComponent } from './public/portfolio/components/portfolio-products/product-detail/product-detail.component';
import { PortfolioComponent } from './public/portfolio/portfolio.component';
import { UserBannerComponent } from './public/user/components/user-banner/user-banner.component';
import { UserChangePasswordComponent } from './public/user/components/user-change-password/user-change-password.component';
import { UserDetailComponent } from './public/user/components/user-detail/user-detail.component';
import { UserComponent } from './public/user/user.component';
import { BreadcumberComponent } from './utils/breadcumber/breadcumber.component';
import { CardCategoriesComponent } from './utils/card-categories/card-categories.component';
import { CardCompleteComponent } from './utils/card-complete/card-complete.component';
import { CardMiniComponent } from './utils/card-mini/card-mini.component';
import { CarouselComponent } from './utils/carousel/carousel.component';
import { PaginatorComponent } from './utils/paginator/paginator.component';
import { PortfolioFiltersComponent } from './utils/filters/portfolio-filters.component';
import { SwiperComponent } from './utils/swiper/swiper.component';
import { ProductsAllComponent } from './public/portfolio/components/portfolio-products/products-all/products-all.component';
import { PortfolioDetailComponent } from './utils/portfolio-detail/portfolio-detail.component';
import { PortfolioDetailThumbnailsComponent } from './utils/portfolio-detail/components/portfolio-detail-thumbnails/portfolio-detail-thumbnails.component';
import { PortfolioDetailGalleryComponent } from './utils/portfolio-detail/components/portfolio-detail-gallery/portfolio-detail-gallery.component';
import { PortfolioDetailDescriptionComponent } from './utils/portfolio-detail/components/portfolio-detail-description/portfolio-detail-description.component';
import { PortfolioDetailQuestionsAnswerComponent } from './utils/portfolio-detail/components/portfolio-detail-questions-answer/portfolio-detail-questions-answer.component';
import { PortfolioDetailRatingsComponent } from './utils/portfolio-detail/components/portfolio-detail-ratings/portfolio-detail-ratings.component';
import { PortfolioDetailGallerySwiperComponent } from './utils/portfolio-detail/components/portfolio-detail-gallery-swiper/portfolio-detail-gallery-swiper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BannerComponent,
    FooterComponent,
    CardMiniComponent,
    CardCategoriesComponent,
    MiddelBannerComponent,
    HomeCategoriesComponent,
    HomeFourBannersComponent,
    HomeTwoBannersComponent,
    HomeExpansionPanelComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    HomeServicesComponent,
    LoadingComponent,
    SimpleAlertComponent,
    HomeStoresComponent,
    HomeMiddelBannerComponent,
    WhatToDoComponent,
    CardCompleteComponent,
    CarouselComponent,
    PortfolioFiltersComponent,
    PortfolioComponent,
    BreadcumberComponent,
    SwiperComponent,
    PaginatorComponent,
    LoginComponent,
    SignupComponent,
    CurrencyFormatDirective,
    MapLocationComponent,
    MapSelectPolygonComponent,
    MapSelectRadiusComponent,
    SubHeaderComponent,
    UserDetailComponent,
    UserComponent,
    UserChangePasswordComponent,
    UserBannerComponent,
    HeaderUserAuthComponent,
    HeaderSearchBarComponent,
    ProductsAllComponent,
    PortfolioDetailComponent,
    PortfolioDetailThumbnailsComponent,
    PortfolioDetailGalleryComponent,
    PortfolioDetailDescriptionComponent,
    PortfolioDetailQuestionsAnswerComponent,
    PortfolioDetailRatingsComponent,
    PortfolioDetailGallerySwiperComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.gmaps_key,
    }),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  providers: [CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
