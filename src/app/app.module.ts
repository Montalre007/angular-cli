import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from '../pages/test.component';
import { LoginComponent } from '../pages/login.component';
import { SiderComponent } from '../components/sider.component';
import { HeaderComponent } from '../components/header.component';
import { CodeComponent } from '../components/code.component';
import { HomeComponent } from './home/home.component';
import { FileUpload } from '../components/file.upload';
import { ImgUpload } from '../components/img.upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import {HomeModule} from './home/home.module';
import {InterceptorService} from './interceptor.service';
import {selfHttp} from '../server/server';
import {Api} from '../server/Api';
// import {LoginApi} from '../server/LoginApi';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SiderComponent,
    HeaderComponent,
    CodeComponent,
    LoginComponent,
    HomeComponent,
    FileUpload,
    ImgUpload
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    HomeModule
  ],
  providers: [selfHttp, Api, { provide: NZ_I18N, useValue: zh_CN }, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
