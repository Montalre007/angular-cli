import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from '../../pages/test.component';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: TestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
