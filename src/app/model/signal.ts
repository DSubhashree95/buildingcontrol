import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class signal {
    id: number;
    name: string;
    buildingId: number;
    classification: string;
    min: number;
    max: number;
    key: string;
    rw: string;
    bms: string;

    public setId(id: number) {
        this.id = id;
    }
    public getId():number {
        return this.id;
    }

    public setName(name: string) {
        this.name = name;
    }
    public getName(): string {
        return  this.name;
    }  
    
    public setBuildingId(buildingId: number) {
        this.buildingId = buildingId;
    }
    public getBuildingId(): number {
        return this.buildingId;
    }

}