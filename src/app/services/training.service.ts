import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from '../host/host';
import { Training } from '../models/Training';
import { PerfilserviceService } from './perfilservice.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(
    private http:HttpClient,
    private perfilService:PerfilserviceService,
    ) { }
  UrlSave = host+'/training/save/';
  UrlUpdate = host+'/training/update/';
  UrlDelete=host+'/training/delete/';
  
  saveTraining(element:Training){
    return this.http.post<any>(this.UrlSave+this.perfilService.getProfile().id,element);
  }
  updateTraining(element:Training){
    return this.http.post<any>(this.UrlUpdate+this.perfilService.getProfile().id,element);
  }
  deleteTraining(element:Training){
    return this.http.delete<any>(this.UrlDelete+this.perfilService.getProfile().id+'/'+element.id);
  }
}
