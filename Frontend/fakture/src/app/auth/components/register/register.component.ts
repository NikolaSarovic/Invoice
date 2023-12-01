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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent {
  form=this.fb.group({
    ime:this.fb.control('',Validators.required),
    prezime:this.fb.control('',Validators.required),
    email:this.fb.control('',[Validators.required,Validators.email]),
    brojTelefona:this.fb.control('',Validators.required),
    lozinka:this.fb.control('',Validators.required)
  })
  poruka:string=""
  constructor(private fb:FormBuilder,private service:AuthService,private router:Router){

  }

  register(){
    const registerForm=this.form.value;
    this.service.register(registerForm).subscribe((response:any)=>{
      if(response?.success==true)
      {
        console.log(response?.message)
         this.router.navigate(['login']);
      }
      if(response?.success==false)
      {
        
      localStorage.setItem("message",response?.message)
        console.log(response?.message)
        
      }
    })
    
  }
  login() {
    this.router.navigate(['login']);
  }
}
