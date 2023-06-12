import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './_index/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './public/home/home.component';
import { BannerComponent } from './public/home/components/banner/banner.component';
import { SwiperModule } from 'swiper/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './_index/footer/footer/footer.component';
import { CardMiniComponent } from './utils/card-mini/card-mini.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardCategoriesComponent } from './utils/card-categories/card-categories.component';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe } from '@angular/common';
import { MiddelBannerComponent } from './public/home/components/middel-banner/middel-banner.component';
import { HomeCategoriesComponent } from './public/home/components/home-categories/home-categories.component';
import { HomeFourBannersComponent } from './public/home/components/home-four-banners/home-four-banners.component';
import { HomeTwoBannersComponent } from './public/home/components/home-two-banners/home-two-banners.component';
import { HomeExpansionPanelComponent } from './public/home/components/home-expansion-panel/home-expansion-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { HomeServicesComponent } from './public/home/components/home-services/home-services.component';
import { ProductCreateComponent } from './public/portfolio/components/products/product-create/product-create.component';
import { ProductDetailComponent } from './public/portfolio/components/products/product-detail/product-detail.component';
import { ProductParentRouterComponent } from './public/portfolio/components/products/portfolio/product-parent-router.component';
import { ProductsComponent } from './public/portfolio/components/products/products/products.component';
import { LoadingComponent } from './modal/loading/loading.component';
import { SimpleAlertComponent } from './modal/simple-alert/simple-alert.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeStoresComponent } from './public/home/components/home-stores/home-stores.component';
import { HomeMiddelBannerComponent } from './public/home/components/home-middel-banner/home-middel-banner.component';
import { WhatToDoComponent } from './public/home/components/what-to-do/what-to-do.component';
import { CardCompleteComponent } from './utils/card-complete/card-complete.component';
import { CarouselComponent } from './utils/carousel/carousel.component';
import { PortfolioFiltersComponent } from './utils/portfolio-filters/portfolio-filters.component';
import { PortfolioComponent } from './public/portfolio/portfolio.component';
import { PortfolioAllComponent } from './public/portfolio/components/portfolio-all/portfolio-all.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AllComponent } from './public/portfolio/components/products/components/all/all.component';
import { BreadcumberComponent } from './utils/breadcumber/breadcumber.component';
import { SwiperComponent } from './utils/swiper/swiper.component';
import { PaginatorComponent } from './utils/paginator/paginator.component';
import { LoginComponent } from './modal/login/login.component';
import { SignupComponent } from './modal/signup/signup.component';
import { SimpleComponent } from './modal/simple/simple.component';
import { CurrencyFormatDirective } from './core/directives/currencyFormat/currency-format.directive';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { MapLocationComponent } from './modal/map-location/map-location.component';
import { MapSelectPolygonComponent } from './modal/map-select-polygon/map-select-polygon.component';
import { MapSelectRadiusComponent } from './modal/map-select-radius/map-select-radius.component';
import { SubHeaderComponent } from './_index/header/components/sub-header/sub-header.component';

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
    ProductParentRouterComponent,
    ProductsComponent,
    LoadingComponent,
    SimpleAlertComponent,
    HomeStoresComponent,
    HomeMiddelBannerComponent,
    WhatToDoComponent,
    CardCompleteComponent,
    CarouselComponent,
    PortfolioFiltersComponent,
    PortfolioComponent,
    PortfolioAllComponent,
    AllComponent,
    BreadcumberComponent,
    SwiperComponent,
    PaginatorComponent,
    LoginComponent,
    SignupComponent,
    SimpleComponent,
    CurrencyFormatDirective,
    MapLocationComponent,
    MapSelectPolygonComponent,
    MapSelectRadiusComponent,
    SubHeaderComponent,
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
