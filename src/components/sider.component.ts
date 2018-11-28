import {Component, OnInit, Input} from '@angular/core';
import {Api} from '../server/Api';

@Component({
  selector: 'sider',
  template: `
    <ul nz-menu [nzMode]="'inline'" style="height:100%">
      <div *ngFor="let menu of menuList">
        <li nz-submenu  *ngIf="menu.children.length !== 0 && menu.children[0].ftype !== 2">
          <span title><i nz-icon type="user"></i>{{menu.fname}}</span>
          <ul *ngFor="let child of menu.children">
            <li nz-menu-item>{{child.fname}}</li>
          </ul>
        </li>
        <li nz-menu-item *ngIf="menu.children.length === 0 || menu.children[0].ftype === 2">{{menu.fname}}</li>
      </div>
    </ul>
  `
})
export class SiderComponent implements OnInit {
  menuList = [];
  constructor (private http: Api) {}
  ngOnInit () {
    this.http.getFunctionMenu( {}, res => {
      if (res.ret) {
        this.menuList = res.data;
      }
    });
  }
}
