import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/Perfil';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { UserClient } from 'src/app/models/UserClient';
import { PerfilserviceService } from 'src/app/services/perfilservice.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  admin:User=new User();
  user:User=new User();
  
  passwordAdmin="";
  passwordUser="";

  messageAlertUser=false;
  messageAlertAdmin=false;
  constructor(private serviceUser:ServiceUserService,private servicePerfil:PerfilserviceService) { }

  ngOnInit(): void {
    
    this.serviceUser.getUserEdit(this.servicePerfil.getProfile().id).subscribe( data => {
      console.log(data)
      if(data){
        if(data.length==1){
        
          this.admin.id=data[0].id;
          this.admin.name=data[0].name;
        }else{
          
          this.admin.id=data[0].id;
          this.admin.name=data[0].name;
          this.user.id=data[1].id;
          this.user.name=data[1].name;
         }
      }else{
        console.log("no hay usuarios");
      }
      
    });
  }

  saveAdmin(){
    if(this.admin.password==this.passwordAdmin){
      let role=new Role();
      role.id=1;
      role.name="ADMIN"
      this.admin.role.push(role);
      let role2=new Role();
      role2.id=2;
      role2.name="USER"
      this.admin.role.push(role2);
      this.admin.perfil=this.servicePerfil.getProfile()
      this.serviceUser.saveUser(this.admin).subscribe( data => {
        
      } );
    }
  }
  saveUser(){
    if(this.user.password==this.passwordUser){
      let role=new Role();
      role.id=2;
      role.name="USER"
      this.user.role.push(role);
      this.user.perfil=this.servicePerfil.getProfile()
      this.serviceUser.saveUser(this.user).subscribe( data => {
        
      } );
    }
  }

}
