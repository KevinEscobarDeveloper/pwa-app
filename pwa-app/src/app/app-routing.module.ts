import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CoffeComponent } from './coffe/coffe.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'coffee', component: CoffeComponent},
  {path: 'coffee/:id', component: CoffeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
