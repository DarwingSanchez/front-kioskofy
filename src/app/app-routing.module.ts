import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { ProductCreateComponent } from './public/portfolio/modules/portfolio-products/product-create/product-create.component'; 
import { ProductDetailComponent } from './public/portfolio/modules/portfolio-products/product-detail/product-detail.component'; 
import { PortfolioComponent } from './public/portfolio/portfolio.component';
import { ProductsAllComponent } from './public/portfolio/modules/portfolio-products/products-home/products-all.component';
import { OrdersComponent } from './public/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [HomeGuard],
    children: [
        {
          path: 'product/detail/:slug_id',
          component: ProductDetailComponent,
          data: { breadcrumb: { alias: 'detail' } },
        },
      ],
    },
    { path: "products", redirectTo: "products/all" },
    {
    path: 'products',
    component: PortfolioComponent,
    data: { breadcrumb: { alias: 'products' } },
    children: [
      {
        path: 'all',
        component: ProductsAllComponent,
        data: { breadcrumb: { alias: 'all' } },
      },
      {
        path: 'create',
        component: ProductCreateComponent,
        data: { breadcrumb: { alias: 'create' } },
      },
      {
        path: 'detail/:slug_id',
        component: ProductDetailComponent,
        data: { breadcrumb: { alias: 'detail' } },
      },
    ],
  },
  {
    path: 'orders/:orders_type',
    component: OrdersComponent,
    data: { breadcrumb: { alias: 'orders' } },
  },
  // Not found!
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
