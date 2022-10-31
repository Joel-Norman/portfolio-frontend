import { Component, Input, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
import { TokenService } from 'src/app/services/tokenservice';

@Component({
  selector: 'app-ngnavbar',
  templateUrl: './ngnavbar.component.html',
  styleUrls: ['./ngnavbar.component.css']
})
export class NgnavbarComponent implements OnInit {

  model=[
  {label:'Main',link:'/main',active:true,style:{color: '#149ddd'},class:'item-menu-active',icon:'bi bi-house-door',isVisible:this.serviceToken.isUser()},
  {label:'Certificates',link:'/certificados',active:false,style:{color: '#9e9e9e'},class:'item-menu',icon:'bi bi-postcard',isVisible:this.serviceToken.isUser()},
  {label:'Contact',link:'/contacto',active:false,style:{color: '#9e9e9e'},class:'item-menu',icon:'bi bi-envelope',isVisible:this.serviceToken.isUser()},
  {label:'Edit',link:'/editar',active:false,style:{color: '#9e9e9e'},class:'item-menu',icon:'bi bi-pencil-square',isVisible:this.serviceToken.isAdmin()},
  {label:'User',link:'/user',active:false,style:{color: '#9e9e9e'},class:'item-menu',icon:'bi bi-people',isVisible:this.serviceToken.isAdmin()},
  {label:'Logout',link:'/login',active:false,style:{color: '#9e9e9e'},class:'item-menu',icon:'bi bi-box-arrow-right',isVisible:true},

]
  
  //#9e9e9e
  //#149ddd
  constructor(private serviceToken:TokenService) {
    
  }

  isVisible(item:any){
    return item.isVisible;
  }
  ngOnInit(): void {
  }

  click(item:any){
    for(let i of this.model){
      i.active=false;
      i.style={color: '#9e9e9e'};
      i.class='item-menu'
    }
    item.active=true;
    item.style={color: '#149ddd'}
    item.class='item-menu-active'
    console.log(this.model);
  }
  
}
