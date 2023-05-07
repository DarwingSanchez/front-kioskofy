import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './_index/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './home/components/banner/banner.component';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './_index/footer/footer/footer.component';
import { CardMiniComponent } from './utils/card-mini/card-mini.component';
import {MatCardModule} from '@angular/material/card';
import { CardCategoriesComponent } from './utils/card-categories/card-categories.component';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe } from '@angular/common';
import { MiddelBannerComponent } from './home/components/middel-banner/middel-banner.component';
import { HomeCategoriesComponent } from './home/components/home-categories/home-categories.component';
import { HomeFourBannersComponent } from './home/components/home-four-banners/home-four-banners.component';
import { HomeTwoBannersComponent } from './home/components/home-two-banners/home-two-banners.component';
import { HomeExpansionPanelComponent } from './home/components/home-expansion-panel/home-expansion-panel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HomeServicesComponent } from './home/components/home-services/home-services.component';
import { ProductCreateComponent } from './portfolio/components/products/product-create/product-create.component';
import { ProductDetailComponent } from './portfolio/components/products/product-detail/product-detail.component';
import { ProductParentRouterComponent } from './portfolio/components/products/portfolio/product-parent-router.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductsComponent } from './portfolio/components/products/products/products.component';
import { LoadingComponent } from './modal/loading/loading.component';
import { SimpleAlertComponent } from './modal/simple-alert/simple-alert.component';
import { MiniCardProductCreateComponent } from './portfolio/components/products/product-create/componentes/mini-card-product-create/mini-card-product-create.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeStoresComponent } from './home/components/home-stores/home-stores.component';
import { HomeMiddelBannerComponent } from './home/components/home-middel-banner/home-middel-banner.component';
import { WhatToDoComponent } from './home/components/what-to-do/what-to-do.component';
import { SwiperProdservInformationComponent } from './home/components/swiper-prodserv-information/swiper-prodserv-information.component';
import { CardCompleteComponent } from './utils/card-complete/card-complete.component';
import { CarouselComponent } from './utils/carousel/carousel.component';
import { PortfolioFiltersComponent } from './utils/portfolio-filters/portfolio-filters.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioAllComponent } from './portfolio/components/portfolio-all/portfolio-all.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AllComponent } from './portfolio/components/products/components/all/all.component';
import { BreadcumberComponent } from './utils/breadcumber/breadcumber.component';
import { SwiperComponent } from './utils/swiper/swiper.component';
import { PaginatorComponent } from './utils/paginator/paginator.component';
import { LoginComponent } from './modal/login/login.component';
import { SignupComponent } from './modal/signup/signup.component';

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
    MiniCardProductCreateComponent,
    HomeStoresComponent,
    HomeMiddelBannerComponent,
    WhatToDoComponent,
    SwiperProdservInformationComponent,
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
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    SwiperModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
