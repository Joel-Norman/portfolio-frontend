import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/Perfil';
import { PerfilserviceService } from 'src/app/services/perfilservice.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {

  perfil:Perfil= new Perfil();
  constructor(public servicePerfil:PerfilserviceService) { }

  ngOnInit(): void {
    this.servicePerfil.loadProfile();
  }

}
