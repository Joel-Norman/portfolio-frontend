import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from '../host/host';
import { Jwt } from '../models/Jwt';
import { User } from '../models/User';
import { UserClient } from '../models/UserClient';
import { UserLogin } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  constructor(private http:HttpClient) { }
  UrlGet = host+'/perfil/1';
  UrlLogin = host+'/auth/login';
  UrlSave=host+'/auth/save/user';
  
  UrlDeleteCountry=host+'/DeleteCountry'
  UrlGetEdit = host+'/perfil/edit/';
  
  //Url = 'http://34.175.234.125:8080/ListCountry';
  // UrlSave='http://34.175.234.125:8080/ListCountry/save';
  //UrlDeleteCountry='http://34.175.234.125:8080/DeleteCountry'
 

  saveUser(user:User){
    return this.http.post<any>(this.UrlSave,user);
  }
  
  getUser(id:string){
    return this.http.get<UserClient[]>(this.UrlGet);
  }
  getUserEdit(id:number){
    return this.http.get<UserClient[]>(this.UrlGetEdit+id);
  }
  loginUser(user:UserLogin){
    let loginUsuario=user
    return this.http.post<Jwt>(this.UrlLogin,loginUsuario);
  }
}
