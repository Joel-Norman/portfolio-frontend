import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Perfil } from '../models/Perfil';
import { TokenService } from './tokenservice';
import { Router, TitleStrategy } from '@angular/router';
import { host } from '../host/host';
@Injectable({
  providedIn: 'root'
})
export class PerfilserviceService {
  profile:Perfil;
  constructor(
    private http:HttpClient,
    private tokenService:TokenService,
    private router:Router) { 
      this.profile=new Perfil();
    }
  UrlGet = host+'/perfil/';
  UrlSave=host+'/save';
  UrlDeleteCountry=host+'/DeleteCountry'
  
    /**
     * 
     * set an get Profile
     */
    getProfile(){
      return this.profile;
    }
    setProfile(profile:Perfil){
      return this.profile=profile;
    }
  getPerfil() {
    return this.http.get<Perfil>(this.UrlGet+this.tokenService.getUsername());
  }

  savePerfil(perfil:Perfil){
    return this.http.post<Perfil>(this.UrlSave,perfil);
  }
  getImagen() {
    return this.http.get<any>(host+'/GetImage/'+this.profile.id);
  }
  saveImagenProfile(file:File) {
    const formData:FormData= new FormData();
    formData.append("file",file);
    return this.http.post<any>(host+'/SaveImageProf/'+this.profile.id,formData);
    
  }
  saveImagenFronPage(file:File) {
    const formData:FormData= new FormData();
    formData.append("file",file);
    return this.http.post<any>(host+'/SaveImageFront/'+this.profile.id,formData);
    
  }
  
  loadProfile(){
    this.getPerfil().subscribe(
      data=>{
        console.log(data);
        if(data){
          this.profile=data;
        }
        
      },error =>{
        this.router.navigate(['/login']);
      }
    );
    
  }
}
