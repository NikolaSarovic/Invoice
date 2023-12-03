import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ResponseAlert, artikliData } from 'app/fakture/models/DataModels';
import { FaktureService } from 'app/fakture/services/fakture.service';


@Component({
  selector: 'app-artikal-create',
  templateUrl: './artikal-create.component.html',
  styleUrls: ['./artikal-create.component.css'],
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
export class ArtikalCreateComponent {

  constructor(private fb:FormBuilder,private service:FaktureService) {
  }
  fakturaId=localStorage.getItem('fakturaId') as unknown as number
  artikalData:artikliData |undefined

  form=this.fb.group({
    nazivArtikla:this.fb.control('',Validators.required) ,
    kolicina:this.fb.control('',[Validators.required,Validators.maxLength(10),Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    cijena:this.fb.control('',[Validators.required,Validators.maxLength(10),Validators.maxLength(10),Validators.pattern("^(\\d*\\.)?\\d+$")]),
    postoRabataArtikla:this.fb.control('',[Validators.required,Validators.maxLength(10),Validators.maxLength(10),Validators.pattern("^(\\d*\\.)?\\d+$")]), 
  })

  responseAlert:ResponseAlert={
    error:false,
    success:false,
    message:""
    }

  CreateArtikal() {
    this.artikalData={
      nazivArtikla:this.form.value.nazivArtikla as unknown as string,
      kolicina:this.form.value.kolicina as unknown as number,
      cijena:this.form.value.cijena as unknown as number,
      postoRabataArtikla:this.form.value.postoRabataArtikla as unknown as number,
    }
    this.service.createArtikal(this.fakturaId,this.artikalData).subscribe((response:any)=>{
      this.responseAlert.message="Uspjesno dodato";
      this.responseAlert.success=true;
      console.log(this.responseAlert.message)
      setTimeout(()=>{
        const box=document.getElementById('alert');
        console.log(box)
        if (box != null) {
          this.responseAlert.success=false;
          box.style.display = 'inline-block';
           }
         },1500)
         setTimeout(()=>{window.location.reload()},500)
    },
      (error:any)=> {
      console.log("sou program")
      this.responseAlert.message="Neuspjesno dodato";
      this.responseAlert.error=true;
      setTimeout(()=>{
       const box=document.getElementById('alert');
       console.log(box)
        if (box != null) {
        this.responseAlert.error=false;
        box.style.display = 'inline-block';
        }
         },1500)
      }
    )
    
    
  }

}
