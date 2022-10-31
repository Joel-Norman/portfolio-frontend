import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserLogin } from '../models/UserLogin';
import { ServiceUserService } from '../services/service-user.service';
import { TokenService } from '../services/tokenservice';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Perfil } from '../models/Perfil';
import { Contact } from '../models/Contact';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userlogin:UserLogin;
  userloginFB:UserLogin;
  userFb:User
  perfilFB:Perfil
  mje=false;
  constructor(private authService: SocialAuthService,
    private router:Router,
    private userservice:ServiceUserService,
    private tokenService:TokenService,
    ) {
    this.userlogin=new UserLogin();
    this.userloginFB=new UserLogin();
    this.userFb=new User();
    this.perfilFB=new Perfil();
  }

  ngOnInit(): void {
    this.userlogin.name="user";
    this.userlogin.pasword="user"
  }

  goRegister(){
    this.router.navigate(['/logout']);
  }

  Login(){
    this.mje=false;
    this.userservice.loginUser(this.userlogin).subscribe(data=>{
      
      this.tokenService.setToken(data.token);
      this.tokenService.setUsername(data.name);
      this.tokenService.setAuthorities(data.authorities);
      
      this.router.navigate(['main']);
    },error=>{
      this.mje=true;
    });
  }
  loginFB(){
    this.signInWithFB(); 
  }
  /**
   * pirmero obtener los datos, mandarlos al backend para cmprobar que esta registrado o no
   * si no esta registrado registrar
   * sino dar permiso al Login()
   */
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
        data=>{
          
          //new perfil
          this.perfilFB.name=data.firstName
          this.perfilFB.surname=data.lastName
          var contact:Contact=new Contact();
          contact.type="mail";
          contact.source='assets/imagenes/mail.png';
          contact.source_card='assets/imagenes/mail_card.png';
          contact.details=data.email;
          this.perfilFB.contact.push(contact);
          //new user
          this.userFb.name=data.name
          this.userFb.password=data.id
          let role=new Role();
          role.id=1;
          role.name="ADMIN"
          this.userFb.role.push(role);
          let role2=new Role();
          role2.id=2;
          role2.name="USER"
          this.userFb.role.push(role2);
          this.userFb.perfil=this.perfilFB

          this.userloginFB.name=data.name
          this.userloginFB.pasword=data.id
          this.userservice.saveUser(this.userFb).subscribe( data => {
            console.log(data);
            if(data){
              this.userservice.loginUser(this.userloginFB).subscribe(data=>{
                console.log(data);
                this.tokenService.setToken(data.token);
                this.tokenService.setUsername(data.name);
                this.tokenService.setAuthorities(data.authorities);
                
                this.router.navigate(['main']);
              });
            }else{
              this.userservice.loginUser(this.userloginFB).subscribe(data=>{
                console.log(data);
                this.tokenService.setToken(data.token);
                this.tokenService.setUsername(data.name);
                this.tokenService.setAuthorities(data.authorities);
                
                this.router.navigate(['main']);
              });
            }
            
          });
          //this.Login();
        }
    );
  }
}
