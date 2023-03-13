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
import { HomeComponent } from './home/home/home.component';
import { BannerComponent } from './home/components/banner/banner.component';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './_index/footer/footer/footer.component';
import { ServicesComponent } from './services/services/services.component';
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
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductParentRouterComponent } from './products/product-parent-router/product-parent-router.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductsComponent } from './products/products/products.component';
import { LoadingComponent } from './modal/loading/loading.component';
import { SimpleAlertComponent } from './modal/simple-alert/simple-alert.component';
import { MiniCardProductCreateComponent } from './products/product-create/componentes/mini-card-product-create/mini-card-product-create.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeStoresComponent } from './home/components/home-stores/home-stores.component';
import { HomeMiddelBannerComponent } from './home/components/home-middel-banner/home-middel-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BannerComponent,
    FooterComponent,
    ServicesComponent,
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
    HomeMiddelBannerComponent
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
    MatDatepickerModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
