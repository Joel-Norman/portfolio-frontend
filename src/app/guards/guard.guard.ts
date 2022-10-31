import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/tokenservice';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  realRol: string="";

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    console.log("rol esperado: "+expectedRol);
    const roles = this.tokenService.getAuthorities();
    this.realRol = 'USER';//se cambio a mayuscula
    roles.forEach(rol => {
      if (rol === 'ADMIN') {//se cambio de ROLE_ADMIN a ADMIN
        this.realRol = 'ADMIN';//se cambio a mayuscula
      }
    });
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
      this.router.navigate(['/main']);
      console.log("no acsses");
      return false;
    }
    return true;
  }
}