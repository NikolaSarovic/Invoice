import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {

  form = this.fb.group({
    email:this.fb.control('',[Validators.required,Validators.email]),
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
