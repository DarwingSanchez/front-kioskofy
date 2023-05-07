import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './portfolio/components/products/product-create/product-create.component';
import { ProductDetailComponent } from './portfolio/components/products/product-detail/product-detail.component';
// import { ProductParentRouterComponent } from './products/portfolio/product-parent-router.component';
// import { ProductsComponent } from './products/products/products.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioAllComponent } from './portfolio/components/portfolio-all/portfolio-all.component';


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
  },

    { path: "products", redirectTo: "products/all" },
    {
    path: 'products',
    component: PortfolioComponent,
    data: { breadcrumb: {alias: 'products'} },
    children: [
      {
        path: 'all',
        component: PortfolioAllComponent,
        data: { breadcrumb: {alias: 'all'} },
      },
      {
        path: 'create',
        component: ProductCreateComponent,
        data: { breadcrumb: {alias: 'create'} },
      },
      {
        path: 'detail',
        component: ProductDetailComponent,
        data: { breadcrumb: {alias: 'detail'} },
      },
    ],
  },
  // Not found!
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
