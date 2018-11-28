import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import {Api} from '../server/Api';
import $ from 'jquery';
import { Router} from '@angular/router';
import {CodeComponent} from '../components/code.component';
@Component({
  styleUrls: ['./login.component.scss'],
  template: `
    <div class="login">
      <ul class="login_img">
        <li><img src='../assets/images/1.jpg' alt="" style="display: block"/></li>
        <li><img src='../assets/images/2.jpg' alt=""/></li>
        <li><img src='../assets/images/3.jpg' alt=""/></li>
      </ul>
      <div class="login_info">
        <h2>Login</h2>
        <input type="text" placeholder="Username" [(ngModel)]="username"/>
        <input type="password" placeholder="Password" [(ngModel)]="password"/>
        <div style="overflow: hidden">
          <input type="text" style="width:50%;float:left" maxlength="4" placeholder="Code" [(ngModel)]="code"/>
          <code [width]="120" [height]="42" style="float:left;margin-top: 25px"   (sendCode)="getChildSum($event)"></code>
        </div>
        <button (click)="SignIn()">Sign in</button>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  @ViewChild(CodeComponent) child: CodeComponent;
  constructor (private message: NzMessageService, private server: Api, private router: Router) {}
  username = '';
  password = '';
  code = '';
  time: any;
  codeNum: any = '';
  getChildSum(codeNum: any) {
    this.codeNum = codeNum;
  }
  SignIn () {
    if (this.username === '') {
      this.message.warning('用户名不能为空');
    } else if (this.password === '') {
      this.message.warning('密码不能为空');
    } else if (this.code === '') {
      this.message.warning('验证码不能为空');
    } else if (this.code.toUpperCase() !== this.codeNum) {
      this.message.warning('验证码错误');
      this.child.getCode();
    } else {
      this.server.loginIn({loginName: this.username, loginPassword: this.password}, res => {
        if (res.ret) {
          this.message.success('登陆成功 ');
          this.router.navigateByUrl('home');
        } else {
          this.message.error(res.msg);
        }
      });
    }
  }
  ngOnInit () {
    const _this = this;
    window.onkeyup = function (event) {
      if (event.keyCode && (event.keyCode === 13 || event.keyCode === 108)) {
        _this.SignIn();
      }
    }
    let x = 0;
    this.time = setInterval(function () {
      x++;
      if (x > 2) {
        x = 0;
      }
      $('.login_img li').eq(x).children().fadeIn(1000);
      $('.login_img li').eq(x - 1).children().fadeOut(1000);

    }, 10000)
    console.log(this.username);
  }
}

