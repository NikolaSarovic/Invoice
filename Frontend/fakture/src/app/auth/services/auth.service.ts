import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  



  constructor(private http:HttpClient) {
   }

  
  register(registerData:any){
    return this.http.post('https://localhost:44354/User/Registration',registerData);

  }


  login(loginData:any){
    return this.http.post('https://localhost:44354/User/Login',loginData);
  }


}
