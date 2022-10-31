export class Experience{
    id: number;
    business: string;
    starDate:string;
    finishDate:string;
    position:string;
    job:string;
    details:string;
    imagen:any;
    constructor(){
        this.id=0;
        this.business="";
        this.starDate="";
        this.finishDate="";
        this.position="";
        this.job=""
        this.details="";
        this.imagen=null;
    }
}