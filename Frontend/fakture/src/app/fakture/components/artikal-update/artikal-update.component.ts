import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { artikliData, artikliDataUpdate,ResponseAlert } from 'app/fakture/models/DataModels';
import { FaktureService } from 'app/fakture/services/fakture.service';

@Component({
  selector: 'app-artikal-update',
  templateUrl: './artikal-update.component.html',
  styleUrls: ['./artikal-update.component.css'],
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
export class ArtikalUpdateComponent {

  constructor(private fb:FormBuilder,private service:FaktureService) {
  }
  artikliData:artikliData|undefined
  artikalDataUpdate:artikliDataUpdate|undefined
   artId=(localStorage.getItem('artikalId')) as unknown as number
  
 form=this.fb.group({
  nazivArtikla:this.fb.control('',Validators.required) ,
  kolicina:this.fb.control(0,[Validators.required,Validators.maxLength(10)]),
  cijena:this.fb.control(0,[Validators.required,Validators.maxLength(10)]),
  postoRabataArtikla:this.fb.control(0,[Validators.required,Validators.maxLength(10)]), 
})

responseAlert:ResponseAlert={
  error:false,
  success:false,
  message:""
  }
  
ngOnInit() {
    this.service.getArtikalId(this.artId).subscribe((response:any)=>{
      this.artikliData={
        nazivArtikla:response.nazivArtikla,
        cijena:response.cijena,
        kolicina:response.kolicina,
        postoRabataArtikla:response.postoRabataArtikla
      } 
      this.form.patchValue(this.artikliData) 
    }) 

   }
Update() {
this.artikalDataUpdate={
  artikalId:this.artId,
  nazivArtikla:this.form.value.nazivArtikla as unknown as string,
  cijena:this.form.value.cijena as unknown as number,
  kolicina:this.form.value.kolicina as unknown as number,
  postoRabataArtikla:this.form.value.postoRabataArtikla as unknown as number
  }
  console.log(this.artikalDataUpdate)
  this.service.updateArtikalId(this.artikalDataUpdate).subscribe((response:any)=>{
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
