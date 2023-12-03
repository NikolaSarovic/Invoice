import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ResponseAlert, fakutureData, fakutureDataUpdate } from 'app/fakture/models/DataModels';
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
  responseAlert:ResponseAlert={
    error:false,
    success:false,
    message:""
    }
  

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
   
    this.service.updateFaktura(this.faktDataUpdate).subscribe(
      (response:any)=>{
      
          this.responseAlert.message="Uspjesno izmijenjeno";
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
        this.responseAlert.message="Neuspjesno izmijenjeno";
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

