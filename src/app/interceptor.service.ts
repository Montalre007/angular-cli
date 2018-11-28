import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.body.code === 1008) {
          window.location.href = '';
        }
        return Observable.create(observer => observer.next(event)); // 请求成功返回响应
      }));
  }
}
