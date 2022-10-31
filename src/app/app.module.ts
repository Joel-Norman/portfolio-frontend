import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CertificadosComponent } from './components/certificados/certificados.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EditarComponent } from './components/editar/editar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './components/users/users.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
import { httpInterceptorProviders } from './services/interceptor';
import { NgnavbarComponent } from './element/ngnavbar/ngnavbar.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CertificadosComponent,
    ContactoComponent,
    EditarComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    NgnavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('529281032332746')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
