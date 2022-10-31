import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilserviceService } from '../services/perfilservice.service';
import { TokenService } from '../services/tokenservice';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isAdmin:boolean=false;
 titulo:string="ejemplo"
  constructor(private router:Router,public tokenservice:TokenService,
    private perfilService:PerfilserviceService){}
  ngOnInit(): void {
    if(!this.tokenservice.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    this.tokenservice.getAuthorities();
    this.tokenservice.roles.forEach(item =>{
      if(item==="ADMIN"){
        this.isAdmin=true;
      }
    });
    this.perfilService.loadProfile();
  }

  title = 'Portfolio';
  
  goInicio(){
    this.router.navigate(['/main']);
  }
  goCertificados(){
    this.router.navigate(['/certificados']);
  }
  goContacto(){
    this.router.navigate(['/contacto']);
  }
  goEditar(){
    this.router.navigate(['/editar']);
  }
  goUsers(){
    this.router.navigate(['/user']);
  }
  Logout(){
    this.tokenservice.logout();
    this.router.navigate(['/login']);
  }
}
