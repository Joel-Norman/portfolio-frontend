import { Perfil } from "./Perfil";
import { Role } from "./Role";

export class User{
    public id:number;
    public name:string;
    public password:string;
    public role:Role[];
    perfil:Perfil;
    constructor(){ 
        this.id=0;
        this.name="";
        this.password="";
        this.role=[];
        this.perfil=new Perfil();
    }
}