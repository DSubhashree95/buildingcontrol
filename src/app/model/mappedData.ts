import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class mappedData {
    signalId: number;
    dataUtc: string;
    value: number;
    readUtc: string;
    signalName: string;


    public setDataUtc(dataUtc: string) {
        this.dataUtc = dataUtc;
    }
    public getDataUtc(): string {
        return this.dataUtc;
    }

    public setReadUtc(readUtc: string) {
        this.readUtc = readUtc;
    }
    public getReadUtc(): string {
        return this.readUtc;
    }

    public setValue(value: number) {
        this.value = value;
    }
    public getValue(): number {
        return this.value;
    }

    public setSignalId(signalId: number) {
        this.signalId = signalId;
    }
    public getSignalId(): number {
        return this.signalId;
    }

    public setSignalName(signalName: string) {
        this.signalName = signalName;
    }
    public getSignalName(): string {
        return this.signalName;
    }

}