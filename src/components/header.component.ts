import {Component, OnInit} from '@angular/core';
import {Api} from '../server/Api';

@Component({
  selector: 'header',
  template: `
    <nz-header>
      <div class="logo"></div>
      <ul nz-menu [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
        <li nz-menu-item>nav 1</li>
        <li nz-menu-item>nav 2</li>
        <li nz-menu-item>nav 3</li>
      </ul>
      <nz-dropdown style="position: absolute;right: 20px;top:0;">
        <a nz-dropdown>
          {{username}}<i nz-icon type="down"></i>
        </a>
        <ul nz-menu nzSelectable style="text-align: center">
          <li nz-menu-item>
            <a nz-popconfirm nzTitle="确认要退出?" nzOkText="确认" nzCancelText="取消" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">退出</a>
          </li>
        </ul>
      </nz-dropdown>
    </nz-header>
  `,
  styles  : [
    `.logo {
      width: 120px;
      height: 31px;
      background: rgba(255,255,255,.2);
      margin: 16px 28px 16px 0;
      float: left;
    }`
  ]
})
export class HeaderComponent implements OnInit {
  username = '';
  constructor (private http: Api) {}
  ngOnInit () {
    this.http.getCurrentUser( {}, res => {
      if (res.ret) {
        this.username = res.data.uname;
      }
    });
  }
  confirm () {
    this.http.loginOut( {}, res => {
      if (res.ret as any) {
        window.location.href = '';
      }
    });
  }
  cancel () {}
}
