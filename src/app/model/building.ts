import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class building {
    id: number;
    name: string;

    public setId(id: number) {
        this.id = id;
    }
    public getId(): number {
       return this.id;
    }

    public setName(name: string) {
        this.name = name;
    }
    public getName(): string {
        return  this.name;
    }

}