import {selfHttp} from './server';
import {Injectable} from '@angular/core';

@Injectable()
export class Api {
  constructor (private http: selfHttp) { }
  loginIn (params, fun) {
    return this.http.post('/qmjk/login/login', params, fun);
  }
  loginOut (params, fun) {
    return this.http.get('/qmjk/login/loginOut', params, fun);
  }
  getInstructorInfo (params, fun) {
    return this.http.get('/qmjk/instructorInfo/getInstructorInfo', params, fun);
  }
  getFunctionMenu (params, fun) {
    return this.http.get('/qmjk/function/getFunctionMenu', params, fun);
  }
  getCurrentUser (params, fun) {
    return this.http.get('/qmjk/userinfo/getCurrentUser', params, fun);
  }
}
