import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from '../host/host';
import { Experience } from '../models/Experience';
import { Training } from '../models/Training';
import { PerfilserviceService } from './perfilservice.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(
    private http:HttpClient,
    private perfilService:PerfilserviceService,
    ) { }
  UrlSave = host+'/experience/save/';
  UrlUpdate = host+'/experience/update/';
  UrlDelete=host+'/experience/delete/';
  
  saveExperience(element:Experience){
    return this.http.post<any>(this.UrlSave+this.perfilService.getProfile().id,element);
  }
  updateExperience(element:Experience){
    return this.http.post<any>(this.UrlUpdate+this.perfilService.getProfile().id,element);
  }
  deleteExperience(element:Experience){
    return this.http.delete<any>(this.UrlDelete+this.perfilService.getProfile().id+'/'+element.id);
  }
}
