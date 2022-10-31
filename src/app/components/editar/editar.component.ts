import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { Certificate } from 'src/app/models/Certificate';
import { Contact } from 'src/app/models/Contact';
import { Experience } from 'src/app/models/Experience';
import { Perfil } from 'src/app/models/Perfil';
import { Skill } from 'src/app/models/Skill';
import { Training } from 'src/app/models/Training';
import { User } from 'src/app/models/User';
import { UserClient } from 'src/app/models/UserClient';
import { ExperienceService } from 'src/app/services/experience.service';
import { PerfilserviceService } from 'src/app/services/perfilservice.service';
import { ServiceUserService } from 'src/app/services/service-user.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  ssmensage=false;
  imagen:any;
  isSuccess=false;
  isVisible=false;
  file!: File;
  fileFP!: File;
  options:string[]=[];
  listContact:Contact[]=[];
  selected:string="";
  details:string="";
  productDialog=false;
  //perfil:Perfil=new Perfil();
  training:Training=new Training();
  experience:Experience=new Experience();
  contact:Contact=new Contact();
  certificate:Certificate=new Certificate();

  skillname:string="";
  skillvalue:number=0;

  constructor(
   
    public servicePerfil:PerfilserviceService,
    private trainingService:TrainingService,
    private experienceService:ExperienceService,
    ) { 
   
  }

  ngOnInit(): void {
    this.servicePerfil.loadProfile()
    //this.perfil=this.servicePerfil.getProfile();
    this.options=['email','facebook','instagram','whatsapp'];
    this.listContact=[
      {id:0,details:'',type:'mail',source:'assets/imagenes/mail.png',source_card:'assets/imagenes/mail_card.png'},
      {id:0,details:'',type:'facebook',source:'assets/imagenes/face.png',source_card:'assets/imagenes/face_card.png'},
      {id:0,details:'',type:'instagram',source:'assets/imagenes/insta.png',source_card:'assets/imagenes/insta_card.png'},
      {id:0,details:'',type:'whatsapp',source:'assets/imagenes/what.png',source_card:'assets/imagenes/what_card.png'}
    ];
    
    //this.viewPhoto();
  }

  openImage(){
    this.isVisible=false;
    
  }
  openDescription(){
    this.isVisible=false;
    this.isVisible=false;
  }
  saveDescription(){
    this.isVisible=false;
    this.savePerfil();
  }

  
  savePerfil(){
    this.servicePerfil.savePerfil(this.servicePerfil.getProfile()).subscribe(data=>{
      //this.perfil=data;
      this.isVisible=true;
      this.isSuccess=true;
      this.servicePerfil.loadProfile();
    });
  }


  newTraining(){
    this.training= new Training();
    this.isVisible=false;
      this.isSuccess=true;
  }
  saveNewTraining(){
    this.isVisible=false;
    this.trainingService.saveTraining(this.training).subscribe(
      data=>{
        if(data){
          this.servicePerfil.getProfile().training=data;
          this.isVisible=true;
          this.isSuccess=true;
        }else{
          this.isVisible=true;
          this.isSuccess=false;
        }
      }
    );
  }
  saveEditTraining(){
    this.isVisible=false;
    this.trainingService.updateTraining(this.training).subscribe(
      data=>{
        if(data){
          this.servicePerfil.getProfile().training=data;
          this.isVisible=true;
          this.isSuccess=true;
        }else{
          this.isVisible=true;
          this.isSuccess=false;
        }
      }
    );
  }
  deleteTraining(item:Training){
    this.trainingService.deleteTraining(item).subscribe(
      data=>{
        if(data){
          this.servicePerfil.getProfile().training=data;
        }
      }
    );
  }


  newExperience(){
    this.experience= new Experience();
    this.isVisible=false;
    this.isSuccess=true;
  }
  saveNewExperience(){
    this.isVisible=false;
    this.experienceService.saveExperience(this.experience).subscribe(
      data=>{
        if(data){
          this.servicePerfil.getProfile().experience=data;
          this.isVisible=true;
          this.isSuccess=true;
        }else{
          this.isVisible=true;
          this.isSuccess=false;
        }
      }
    );
  }
  saveEditExperience(){
    this.isVisible=false;
    this.experienceService.updateExperience(this.experience).subscribe(
      data=>{
        if(data){
          this.servicePerfil.getProfile().experience=data;
          this.isVisible=true;
          this.isSuccess=true;
        }else{
          this.isVisible=true;
          this.isSuccess=false;
        }
      }
    );
  }
  deleteExperience(item:Experience){
    this.experienceService.deleteExperience(item).subscribe(
      data=>{
        if(data){
          this.servicePerfil.getProfile().experience=data;
        }else{

        }
      }
    );
  }

  openEditModal(item:Training){
    this.training={...item};
    this.isVisible=false;
         
  }
  openEditModalE(item:Experience){
    this.experience={...item};
    this.isVisible=false;
          
  }

  
  
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.servicePerfil.getProfile().training.length; i++) {
        if (this.servicePerfil.getProfile().training[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  findIndexByIdE(id: number): number {
    let index = -1;
    for (let i = 0; i < this.servicePerfil.getProfile().experience.length; i++) {
        if (this.servicePerfil.getProfile().experience[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }
  
  

  addContact(){
    
    var contact:Contact=new Contact();
    var contact_a=this.listContact[this.findIndexByIdC(this.selected)];
    contact.type=contact_a.type;
    contact.source=contact_a.source;
    contact.source_card=contact_a.source_card;
    contact.details=this.details;
    this.servicePerfil.getProfile().contact.push(contact);
  }

  addSkill(){
    var sl:Skill=new Skill();
    if(this.skillvalue>100){
      this.skillvalue=100;
    }
    if(this.skillvalue<=0){
      this.skillvalue=0;
    }
    sl.name=this.skillname;
    sl.value=this.skillvalue;
    
    this.servicePerfil.getProfile().skill.push(sl);

  }
  findIndexByIdC(type: any): number {
    let index = -1;
    for (let i = 0; i < this.listContact.length; i++) {
        if (this.listContact[i].type === type) {
            index = i;
            break;
        }
    }

    return index;
  }
  deleteContact(item:Contact){
    this.servicePerfil.getProfile().contact = this.servicePerfil.getProfile().contact.filter(val => val !== item);
  }
  deleteSkill(item:Skill){
    this.servicePerfil.getProfile().skill = this.servicePerfil.getProfile().skill.filter(val => val !== item);
  }
  saveEditContact(){
    this.savePerfil();
  }
  saveEditSkill(){
    
    this.savePerfil();
  }
  newCertificate(){
    this.certificate= new Certificate();
    this.isVisible=false;
          
  }
  openEditModalCertificate(item:Certificate){
    this.certificate={...item};
    this.isVisible=false;
        
  }
  deleteCertificate(item:Certificate){
    this.servicePerfil.getProfile().certificate = this.servicePerfil.getProfile().certificate.filter(val => val !== item);
    this.savePerfil();
  }
  saveNewCertificate(){
    this.isVisible=false;
    this.servicePerfil.getProfile().certificate.push(this.certificate);
    this.savePerfil();
  }

  saveEditCertificate(){
    this.isVisible=false;
    let index=this.findIndexByIdCertficate(this.certificate)
    this.servicePerfil.getProfile().certificate[index].details=this.certificate.details
    this.servicePerfil.getProfile().certificate[index].title=this.certificate.title
    this.servicePerfil.getProfile().certificate[index].source=this.certificate.source

    this.savePerfil();
  }
  findIndexByIdCertficate(type: any): number {
    let index = -1;
    for (let i = 0; i < this.servicePerfil.getProfile().certificate.length; i++) {
        if (this.servicePerfil.getProfile().certificate[i].id === type.id) {
            index = i;
            break;
        }
    }

    return index;
  }
  verCertificate(item:Certificate){
    
    window.location.href=item.source;
  }
  selectFile(event: any){
    this.file=event.target.files[0];
    
  }
  selectFileTraining(event: any){
    this.file=event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.training.imagen=e.target.result.split('base64,')[1];
    };
    reader.readAsDataURL(this.file);

  }
  selectFileExperience(event: any){
    this.file=event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.experience.imagen=e.target.result.split('base64,')[1];
    };
    reader.readAsDataURL(this.file);

  }

 
  selectFileFP(event: any){
    this.fileFP=event.target.files[0];
    
  }
  saveImgFront(){
    this.isVisible=false;
    if(this.fileFP!=undefined){
      this.servicePerfil.saveImagenFronPage(this.fileFP).subscribe(event =>{
        this.servicePerfil.setProfile(event);
        this.isVisible=true;
        this.isSuccess=true;
      })
    }
  }
  getValue(item:Skill){
    return {width: item.value+'%', 'background-color':'rgb(80 40 41)'};

  }
  saveImgProfile(){
    this.isVisible=false;
    if(this.file!=undefined){
      this.servicePerfil.saveImagenProfile(this.file).subscribe(event =>{
        this.servicePerfil.setProfile(event);
        this.isVisible=true;
        this.isSuccess=true;
      });
    }
    /**/
  }
  
}
