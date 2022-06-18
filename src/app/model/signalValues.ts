import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class signalValues {
    signalId: number;
    dataUtc: string;
    value: number;
    readUtc: string;


    public setSignalId(signalId: number) {
        this.signalId = signalId;
    }
    public getSignalId(): number {
        return  this.signalId;
    }

    public setDataUtc(dataUtc: string) {
        this.dataUtc = dataUtc;
    }
    public getDataUtc() : string {
        return this.dataUtc;
    }  

    public setreadUtc(readUtc: string) {
        this.readUtc = readUtc;
    }
    public getreadUtc():string {
        return  this.readUtc;
    }  
    
    public setValue(value: number) {
        this.value = value;
    }
    public getValue(): number {
        return   this.value;
    }

}