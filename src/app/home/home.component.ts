import { Component } from '@angular/core';


@Component({
  template: `
    <nz-layout class="layout">
      <header></header>
      <nz-layout>
        <nz-sider [nzWidth]="200" style="background:#fff">
          <sider></sider>
        </nz-sider>
        <nz-layout style="padding:0 24px 24px">
          <nz-breadcrumb style="margin:16px 0;">
            <nz-breadcrumb-item>Home</nz-breadcrumb-item>
            <nz-breadcrumb-item>List</nz-breadcrumb-item>
            <nz-breadcrumb-item>App</nz-breadcrumb-item>
          </nz-breadcrumb>
          <nz-content style="background:#fff; padding: 24px; min-height: 280px;"><router-outlet></router-outlet></nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class HomeComponent {}
