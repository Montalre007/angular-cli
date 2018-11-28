import { NgModule } from '@angular/core';

import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';


@NgModule({
  imports: [
    HomeRoutingModule
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
