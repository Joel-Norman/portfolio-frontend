import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from '../host/host';
import { Mail } from '../models/Mail';

@Injectable({
  providedIn: 'root'
})
export class ServiceMailService {

  UrlSend = host+'/send/mail/';
  constructor(private http:HttpClient) { }

  sendMail(mail:Mail,id:number){
    return this.http.post<any>(this.UrlSend+id,mail);
  }
}
