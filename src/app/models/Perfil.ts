import { Certificate } from "./Certificate";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Skill } from "./Skill";
import { Training } from "./Training";

export class Perfil{
    id:number;
    name:string;
    surname:string;
    description:string;
    training:Training[];
    experience:Experience[];
    contact:Contact[];
    certificate:Certificate[];
    skill:Skill[];
    imagen:any;
    front_page:any;
    constructor(){
        this.id=0;
        this.name="";
        this.surname="";
        this.training=[];
        this.experience=[];
        this.description="";
        this.contact=[];
        this.certificate=[];
        this.skill=[];
        this.imagen=null;
        this.front_page=null;
    }

}