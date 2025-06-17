import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { BillFormComponent } from './bill-form/bill-form.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'purchase-bill-form',
    component: BillFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
