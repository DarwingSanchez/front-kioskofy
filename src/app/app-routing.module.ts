import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductParentRouterComponent } from './products/product-parent-router/product-parent-router.component';
import { ProductsComponent } from './products/products/products.component';


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
    component: ProductParentRouterComponent,
    children: [
      {
        path: 'all',
        component: ProductsComponent,
      },
      {
        path: 'create',
        component: ProductCreateComponent,
      },
      {
        path: 'detail',
        component: ProductDetailComponent,
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
