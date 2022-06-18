import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { auth } from '../model/auth';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const headers = { 'Authorization': 'Basic ' + btoa(environment.clientId + ':' + environment.authSecret), 'Content-Type': 'application/x-www-form-urlencoded' };

@Injectable({
  providedIn: 'root'
})
export class AuthtokenService {

  constructor(private http: HttpClient) { }

  public getToken(): Observable<auth>{
   return this.http.post<auth>(environment.authURL, environment.authGrantTyep, { headers }); 
  }
}

