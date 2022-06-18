import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { building } from '../model/building';
import { Observable } from 'rxjs';
import { signal } from '../model/signal';
import { signalValues } from '../model/signalValues';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}



  public getBuildings(token: string): Observable<building[]> {
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.post<building[]>(environment.rootURL+"/Building/GetBuildings",null, {headers});
  }

  public getSignals(token: string, payload: string): Observable<signal[]> {
     const headers = { 'Authorization': 'Bearer ' + token , 'Content-Type': 'application/json' }
    return this.http.post<signal[]>(environment.rootURL+"/Signal/GetSignals",payload, {headers});
 
  }

  public getSignalValues(token: string, payload: string): Observable<signalValues[]> {
    const headers = { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }
    return this.http.post<signalValues[]>(environment.rootURL+"/Signal/GetSignalValues",payload, {headers});

  }


}
