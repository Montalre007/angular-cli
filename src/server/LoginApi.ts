import {selfHttp} from './server';
import {Injectable} from '@angular/core';
@Injectable()
export class LoginApi {
  constructor (private http: selfHttp) { }
  public loginIn = (params, fun) => {
    return this.http.post('/qmjk/login/login', params, fun);
  }
}
