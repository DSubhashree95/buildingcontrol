import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class auth {

    access_token: string;

    public setToken(tkn: string) {
        this.access_token = tkn;
    }
    public getToken(): string {
        return this.access_token;
    }

}