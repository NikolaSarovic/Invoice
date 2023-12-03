import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, Validators } from '@angular/forms';
import { FaktureService } from 'app/fakture/services/fakture.service';
import { ResponseAlert, fakutureData} from 'app/fakture/models/DataModels';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-fakture-create',
  templateUrl: './fakture-create.component.html',
  styleUrls: ['./fakture-create.component.css'],
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
export class FaktureCreateComponent {
  constructor(private fb:FormBuilder,private service:FaktureService,private router:Router,private _snackBar: MatSnackBar){

  }

  fakturaData:fakutureData|undefined
  responseAlert:ResponseAlert={
    error:false,
    success:false,
    message:""
    }

  form=this.fb.group({
    brojFakture:this.fb.control('',[Validators.required,Validators.maxLength(20)]) ,
    datum:this.fb.control('',[Validators.required,Validators.maxLength(10)]),
    partner:this.fb.control('',[Validators.required,Validators.maxLength(50)]),
    postoRabata:this.fb.control('',[Validators.required,Validators.maxLength(10),Validators.pattern("^(\\d*\\.)?\\d+$")]),
    nazivArtikla:this.fb.control('',Validators.required),
    kolicina:this.fb.control('',[Validators.required,Validators.maxLength(20),Validators.pattern("[0-9]+")]),
    cijena:this.fb.control('',[Validators.required,Validators.maxLength(10),Validators.pattern("^(\\d*\\.)?\\d+$")]),
    postoRabataArtikla:this.fb.control('',[Validators.required,Validators.maxLength(10),Validators.pattern("^(\\d*\\.)?\\d+$")])
  })
 
  onSubmit() {
   //console.log(this.form.value)
   this.fakturaData={
    brojFakture:this.form.value.brojFakture as string,
    datum:this.form.value.datum as string,
    partner:this.form.value.partner as string,
    postoRabata:(this.form.value.postoRabata as string) as unknown as number,
    artikli:[{nazivArtikla:this.form.value.nazivArtikla as string,
    kolicina:(this.form.value.kolicina as string) as unknown as number ,
    cijena:(this.form.value.cijena as string) as unknown as number,
    postoRabataArtikla:(this.form.value.postoRabataArtikla as string) as unknown as number}]}

    //console.log(this.fakturaData)
   this.service.createFaktura(this.fakturaData).subscribe(
    (response:any)=>{
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
     })
  // setTimeout(()=>{window.location.reload()},500)
  
   
  }

}
