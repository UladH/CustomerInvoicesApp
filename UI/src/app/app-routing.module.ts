import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'invoices',
    loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule)
  },
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full'
  },
  {
    path: '*',
    redirectTo: '',
    //redirectTo: '/page-not-found',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
