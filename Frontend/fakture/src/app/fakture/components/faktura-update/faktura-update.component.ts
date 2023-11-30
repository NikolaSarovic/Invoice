import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fakutureData, fakutureDataUpdate } from 'app/fakture/models/DataModels';
import { FaktureService } from 'app/fakture/services/fakture.service';

@Component({
  selector: 'app-faktura-update',
  templateUrl: './faktura-update.component.html',
  styleUrls: ['./faktura-update.component.css'],
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
export class FakturaUpdateComponent {

  constructor(private fb:FormBuilder,private service:FaktureService) {
  }

  faktDataInit:fakutureData |undefined
  faktDataUpdate:fakutureDataUpdate |undefined
  faktId=(localStorage.getItem('fakturaId')) as unknown as number

  form=this.fb.group({
    brojFakture:this.fb.control('',[Validators.required,Validators.maxLength(50)]) ,
    datum:this.fb.control('',[Validators.required,Validators.maxLength(10)]),
    partner:this.fb.control('',[Validators.required,Validators.maxLength(50)]),
    postoRabata:this.fb.control(0,[Validators.required,Validators.maxLength(10)]), 
  })
  
  ngOnInit() {
     this.service.getFakturaId(this.faktId).subscribe((response:any)=>{
      this.faktDataInit={
        brojFakture:response.brojFakture,
        datum:response.datum,
        partner:response.partner,
        postoRabata:response.postoRabata,
        artikli:[]
      }
      console.log(this.faktDataInit)
      this.form.patchValue(this.faktDataInit) 

     })
  }

  Update() {
    this.faktDataUpdate={
    fakturaId:this.faktId,
    brojFakture:this.form.value.brojFakture as unknown as string,
    datum:this.form.value.datum as unknown as string,
    partner:this.form.value.partner as unknown as string,
    postoRabata:this.form.value.postoRabata as unknown as number,
    }
    console.log(this.faktDataUpdate);
    this.service.updateFaktura(this.faktDataUpdate).subscribe((response:any)=>{
      if(response?.success==true){
      
      }
      if(response?.success==false)
        {
          console.log(response?.message)
          
        }

    })
    setTimeout(()=>{window.location.reload()},500)
    
  }
}

