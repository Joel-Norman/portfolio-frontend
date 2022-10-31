import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portfolio';
  constructor(private router:Router){}
  goInicio(){
    this.router.navigate(['/main/']);
  }
  goCertificados(){
    this.router.navigate(['main/certificados']);
  }
  goContacto(){
    this.router.navigate(['main/contacto']);
  }
  goEditar(){
    this.router.navigate(['main/editar']);
  }
}
