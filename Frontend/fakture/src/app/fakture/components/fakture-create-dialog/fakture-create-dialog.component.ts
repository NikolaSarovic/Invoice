import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, Validators } from '@angular/forms';
import { FaktureService } from 'app/fakture/services/fakture.service';
import { fakutureData} from 'app/fakture/models/DataModels';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'


@Component({
  selector: 'app-fakture-create-dialog',
  templateUrl: './fakture-create-dialog.component.html',
  styleUrls: ['./fakture-create-dialog.component.css'],
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
export class FaktureCreateDialogComponent {
  constructor(private fb:FormBuilder,private service:FaktureService,private router:Router,private _snackBar: MatSnackBar){

  }

  fakturaData:fakutureData|undefined

  form=this.fb.group({
    brojFakture:this.fb.control('',[Validators.required,Validators.maxLength(50)]) ,
    datum:this.fb.control('',[Validators.required,Validators.maxLength(10)]),
    partner:this.fb.control('',[Validators.required,Validators.maxLength(50)]),
    postoRabata:this.fb.control('',[Validators.required,Validators.maxLength(10)]),
    nazivArtikla:this.fb.control('',Validators.required),
    kolicina:this.fb.control('',[Validators.required,Validators.maxLength(20)]),
    cijena:this.fb.control('',[Validators.required,Validators.maxLength(10)]),
    postoRabataArtikla:this.fb.control('',[Validators.required,Validators.maxLength(10)])
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
   this.service.createFaktura(this.fakturaData).subscribe((response:any)=>{
    if(response?.success==true){
      console.log(response?.message)
      
    }
    if(response?.success==false)
      {
        console.log(response?.message)
        
      }
   })
   setTimeout(()=>{window.location.reload()},500)
  
   
  }
/* openSnackBar(message: string, type: string) { 
    this._snackBar.open(message, type) 
  }*/



}
