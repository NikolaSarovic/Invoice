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
  error:boolean=false
  message:string=""
  success:boolean=false
  
  constructor(private fb:FormBuilder,private service:AuthService,private router:Router){

  }

  register(){
    const registerForm=this.form.value; 
    this.service.register(registerForm).subscribe((response:any)=>{
      if(response?.success==true)
      {
        this.success=true;
         this.message="uspesno";
      setTimeout(()=>{
      const box=document.getElementById('alertRegister');
      console.log(box)
      if (box != null) {
        this.success=false;
        box.style.display = 'inline-block';
         }
       },1500)
       setTimeout(()=>{ this.router.navigate(['login']);},2500)
 
      }
      if(response?.success==false)
      {
        this.error=true;
          this.message=response?.message
          console.log(this.error)
          setTimeout(()=>{
            const box=document.getElementById('alertRegister');
            console.log(box)
            if (box != null) {
              this.error=false;
              box.style.display = 'none';
            }
       },2500)
        console.log(response?.message)
        
      }
    })
    
  }
  login() {
    this.router.navigate(['login']);
  }
}
