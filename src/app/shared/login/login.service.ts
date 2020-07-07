import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  logUser(user: User){

    //console.log("data received from service: ", user);
    return this.http.post('http://localhost:3000/login', user)
    .pipe(tap(resp => this.setSession(resp)))

  }

  private setSession(logingResult){
    console.log('data received from service: ', logingResult);
    const expiresAt = moment().add(logingResult.userData.expiresIn, 'second');
    localStorage.setItem('accessToken', logingResult.userData.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  loggout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expires_at');

  }

  isLoggedIn(){
    const date = new Date(0)
    const tokenExpDate = date.setUTCSeconds(parseInt(localStorage.getItem('expires_at')))
    if(tokenExpDate > new Date().valueOf()){
      return true
    }else{
      return false
    }
    console.log("is logged in: ",this.getExpiration())
    //return moment().isBefore(this.getExpiration());
    
  }


  getExpiration(){
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.stringify(expiration);
    return moment(expiresAt);
  }



}
