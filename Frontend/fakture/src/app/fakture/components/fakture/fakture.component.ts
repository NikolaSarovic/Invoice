import { Component,Inject } from '@angular/core';
import { FaktureService } from '../../services/fakture.service';

import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FaktureCreateDialogComponent } from '../fakture-create-dialog/fakture-create-dialog.component';
import { Router } from '@angular/router';
import { FakturaOdredjenaComponent } from '../faktura-odredjena/faktura-odredjena.component';



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

  openDialog(): void {
    const dialogRef = this.dialog.open(FaktureCreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
  deleteFaktura(id:number){
    this.service.deleteFaktura(id).subscribe((response:any) => {})
    window.location.reload()
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


