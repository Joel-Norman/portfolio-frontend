import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CertificadosComponent } from './components/certificados/certificados.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EditarComponent } from './components/editar/editar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

import { RegisterComponent } from './register/register.component';
import { GuardService as guard } from './guards/guard.guard';
const routes: Routes = [
  {path:'',component:MainComponent,children:[
    { path: '', component: InicioComponent },
    { path: 'main', component: InicioComponent },
    { path: 'certificados', component: CertificadosComponent},
    {path:'contacto',component:ContactoComponent},
    { path:'editar',component: EditarComponent,canActivate: [guard], data: { expectedRol: ['ADMIN'] }},//se cambio a mayuscula
    {path:'user',component:UsersComponent,canActivate: [guard], data: { expectedRol: ['ADMIN'] }}//se cambio a mayuscula
  ]},
 
  {path:'login',component:LoginComponent},
  {path:'logout',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
