import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = this.fb.group({
    email:this.fb.control('',Validators.required),
    password:this.fb.control('',Validators.required)
  });


  constructor(private fb:FormBuilder,private service:AuthService,private router:Router){

  }
  

  login(){
    const loginForm = this.form.value;
    this.service.login(loginForm).subscribe((response:any) => {
      if(response?.token){
        localStorage.setItem("token",response?.token)
        this.router.navigate(['fakture']);
      }
    })
  }
  registracija() {
    this.router.navigate(['register'])
  }
}
