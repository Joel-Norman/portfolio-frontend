import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


    const TOKEN_KEY = 'token';
    const USERNAME_KEY = 'tokenType';
    const AUTHORITIES_KEY = 'authorities';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
 
    roles: string[] = [];
  constructor(private http:HttpClient) { }
  
  public setToken(token: string) {   //setToken
        //window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }
    public getToken():any {   //getToken
        return window.localStorage.getItem(TOKEN_KEY);
    }
    public getUsername(): any {   //getUsername
        return window.localStorage.getItem(USERNAME_KEY);
    }
    public setUsername(username: string) {   //setUsername
        //window.localStorage.removeItem(USERNAME_KEY);
        window.localStorage.setItem(USERNAME_KEY, username);
    }
    public setAuthorities(authorities: string[]) {   //setAuthorities
        //window.localStorage.removeItem(AUTHORITIES_KEY);
        window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
        
    }
    public getAuthorities(): string[] {
        this.roles = [];
        if (window.localStorage.getItem(AUTHORITIES_KEY)) {
          JSON.parse(window.localStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: { authority: string; }) => {
            this.roles.push(authority.authority);
          });
        }
        console.log(this.roles);
        return this.roles;
      }
   
    public logout() {
        window.localStorage.clear();
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem(TOKEN_KEY) !== null;
    }

    public invalidToken(){
        window.localStorage.setItem(TOKEN_KEY, "i");
    }
    isAdmin(): boolean{
        for(let item of this.getAuthorities()){
            if(item==="ADMIN"){
                return true;
            }
        }
        return false;
    }
    isUser(): boolean{
        for(let item of this.getAuthorities()){
            if(item==="USER"||item=="ADMIN"){
                return true;
            }
        }
        return false;
    }
}