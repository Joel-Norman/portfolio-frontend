import { Component, OnInit } from '@angular/core';
import { Mail } from 'src/app/models/Mail';
import { Perfil } from 'src/app/models/Perfil';
import { PerfilserviceService } from 'src/app/services/perfilservice.service';
import { ServiceMailService } from 'src/app/services/service.mail.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  mail:Mail;
  perfil:Perfil= new Perfil();
  isVisible=false;
  constructor(public servicePerfil:PerfilserviceService,private serviceMail:ServiceMailService) {
    this.mail=new Mail();
   }

  ngOnInit(): void {
    this.servicePerfil.loadProfile();
  }

  sendMail(){
    if(this.mail.email.trim()!=''&&this.mail.subject.trim()!=''&&this.mail.message.trim()!=''){
      this.serviceMail.sendMail(this.mail,this.perfil.id).subscribe(
        data=>{
          
          if(data){
            
            this.mail=new Mail();
            this.isVisible=true;
          }else{
           
          }
        },error =>{
          
        }
      );
    }
  }
}
