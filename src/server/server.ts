import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import qs from 'qs/lib';

@Injectable()
export class selfHttp {
  public restServer;
  public http;
  public headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  constructor(Http: HttpClient) {
    this.http = Http;
    this.restServer = '/qmjk';
  }

  public get(url, params?: Object, cb?: Function) {
    let httpParams = new HttpParams();
    console.log('get开始请求');
    const vm = this;
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    vm.http.get(vm.restServer + url, {params: httpParams}, {headers: this.headers})
      .subscribe(data => {
        console.log('get请求结束', data);
        cb(data);
      });
  }

  public post(url, data?: Object, cb?: Function, options?: Object) {
    console.log('post开始请求');
    const vm = this;
    vm.http.post(vm.restServer + url, qs.stringify(data), {headers: this.headers}, options)
      .subscribe(res => {
        console.log('post请求结束', res);
        cb(res);
      });
  }
}
