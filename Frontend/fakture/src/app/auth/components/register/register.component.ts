import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form=this.fb.group({
    ime:this.fb.control('',Validators.required),
    prezime:this.fb.control('',Validators.required),
    email:this.fb.control('',Validators.required),
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
}
