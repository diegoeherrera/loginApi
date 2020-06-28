import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  logUser(user: User){
    const headers =
    console.log("data received from service: ", user);
    return this.http.post('http://localhost:3000/login', user);

  }




}
