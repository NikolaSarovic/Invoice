import { Component,Inject } from '@angular/core';
import { FaktureService } from '../../services/fakture.service';

import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FakturaOdredjenaComponent } from '../faktura-odredjena/faktura-odredjena.component';
import { FakturaDeleteComponent } from '../faktura-delete/faktura-delete.component';
import { FaktureCreateComponent } from '../fakture-create/fakture-create.component';



@Component({
  selector: 'app-fakture',
  templateUrl: './fakture.component.html',
  styleUrls: ['./fakture.component.css'],
  
})
export class FaktureComponent {

  constructor(private service:FaktureService,private dialog:MatDialog,private router:Router){}
  fakture:any[] = [] 
  ngOnInit(){
     this.service.getFakture().subscribe((response:any) => {
      this.fakture = response;
     })
     console.log(localStorage.getItem('token'))
     
  }

  createFaktura(): void {
    const dialogRef = this.dialog.open(FaktureCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
  deleteFaktura(id:number){
    localStorage.setItem("fakturaId",id.toString())
    console.log(id);
    const dialogRef=this.dialog.open(FakturaDeleteComponent)
    
  }
  Logout():void {
    localStorage.setItem("token","")
    this.router.navigate(['login']);
  }
  PregledFakture(id:number):void {
   localStorage.setItem("fakturaId",id.toString())
    this.router.navigate(['fakturaId']);

  }

}


