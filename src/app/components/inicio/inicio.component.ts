import { HashLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Experience } from 'src/app/models/Experience';
import { Perfil } from 'src/app/models/Perfil';
import { Skill } from 'src/app/models/Skill';
import { Training } from 'src/app/models/Training';
import { PerfilserviceService } from 'src/app/services/perfilservice.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  perfil:Perfil= new Perfil();

  trainings:Training[]=[];
  
  experiences:Experience[]=[];
   
  
  constructor(public servicePerfil:PerfilserviceService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.servicePerfil.loadProfile();
    /*this.servicePerfil.getPerfil().subscribe(
      (data)=>{
        this.perfil=data;
        this.imagen = this.sanitizer.bypassSecurityTrustUrl('data:image/PNG;base64,'+data.imagen);
        this.imagen2 = this.sanitizer.bypassSecurityTrustUrl('data:image/PNG;base64,'+data.front_page);
        this.loadTrainigs();
        this.loadExperiences();
      });
      */
  }
  loadTrainigs(){
    
    if(this.perfil.training.length>0){
      
      this.trainings=this.perfil.training;
    //se usa con el carrusel de botstrap
      //this.trainings=this.perfil.training.slice(1);
    }
  }
  loadExperiences(){
    
    if(this.perfil.experience.length>0){
      
      this.experiences=this.perfil.experience;
    }
  }
  getValue(item:Skill){
    return {width: item.value+'%', 'background-color':'rgb(80 40 41)' ,color:'rgb(256 256 256)'};
  }

}