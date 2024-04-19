import { TransactionsComponent } from './pages/transactions/transactions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsListComponent } from './pages/transactions-list/transactions-list.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsListComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
