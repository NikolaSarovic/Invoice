import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { artikliData } from 'app/fakture/models/DataModels';
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
    kolicina:this.fb.control('',[Validators.required,Validators.maxLength(10)]),
    cijena:this.fb.control('',[Validators.required,Validators.maxLength(10)]),
    postoRabataArtikla:this.fb.control('',[Validators.required,Validators.maxLength(10)]), 
  })

  CreateArtikal() {
    this.artikalData={
      nazivArtikla:this.form.value.nazivArtikla as unknown as string,
      kolicina:this.form.value.kolicina as unknown as number,
      cijena:this.form.value.cijena as unknown as number,
      postoRabataArtikla:this.form.value.postoRabataArtikla as unknown as number,
    }
    this.service.createArtikal(this.fakturaId,this.artikalData).subscribe((response:any)=>{
         if(response?.success==true)
         {
           console.log(response.message)
         }
         if(response?.success==false)
         {
           console.log(response.message)
         }
    })
    setTimeout(()=>{window.location.reload()},500)
  }

}
