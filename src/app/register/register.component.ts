import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../models/Role';
import { User } from '../models/User';
import { ServiceUserService } from '../services/service-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser:User=new User();
  repeatPassword="";
  alertMessage=false;
  constructor(private serviceUser:ServiceUserService,private router:Router) { }

  ngOnInit(): void {
  }

  saveNewUser(){
    
    if(this.newUser.password==this.repeatPassword){
      let role=new Role();
      role.id=1;
      role.name="ADMIN"
      this.newUser.role.push(role);
      let role2=new Role();
      role2.id=2;
      role2.name="USER"
      this.newUser.role.push(role2);
      this.serviceUser.saveUser(this.newUser).subscribe( data => {
        
        if(data){
          this.router.navigate(['/login']);
        }else{
          
          this.alertMessage=true;
        }
        
      });
    }
  }
  
  goLogin(){
    this.router.navigate(['/login']);
  }
}
