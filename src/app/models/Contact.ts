import { NumberFormatStyle } from "@angular/common";

export class Contact{
    id:number;
    details:string;
    type:string;
    source:string;
    source_card:string;
    constructor(){
        this.id=0;
        this.details="";
        this.type="";
        this.source="";
        this.source_card="";
    }
}