import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HTTP_INTERCEPTORS} from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenService } from './tokenservice';
import { provideRoutes } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
 
  constructor(private tokenService:TokenService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let IntReq=req;
        const token= this.tokenService.getToken();
        if(token!=null){
            IntReq=req.clone({headers:req.headers.set('Authorization','Bearer'+token)});
        }
        return next.handle(IntReq);
    }
 

}
export const httpInterceptorProviders=[ {provide:HTTP_INTERCEPTORS ,    useClass: InterceptorService,multi:true}];