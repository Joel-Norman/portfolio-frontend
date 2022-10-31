export class Jwt{
    token:string;
    tokenType:string;
    name:string;
    authorities:string[];

    constructor(){
        this.token="";
        this.tokenType="";
        this.name="";
        this.authorities=[];
    }
}