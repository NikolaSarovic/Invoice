import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FaktureService } from 'app/fakture/services/fakture.service';
import { ArtikalUpdateComponent } from '../artikal-update/artikal-update.component';
import { ArtikalCreateComponent } from '../artikal-create/artikal-create.component';
import { FakturaUpdateComponent } from '../faktura-update/faktura-update.component';

@Component({
  selector: 'app-faktura-odredjena',
  templateUrl: './faktura-odredjena.component.html',
  styleUrls: ['./faktura-odredjena.component.css']
})
export class FakturaOdredjenaComponent {
  IdFakture:number |undefined
  data:any=[]
  
  constructor(private service:FaktureService,private router:Router,private dialog:MatDialog) {

  }
  ngOnInit(){
    this.IdFakture=(localStorage.getItem('fakturaId')) as unknown as number
    this.service.getFakturaId(this.IdFakture).subscribe((response:any)=>{
      this.data=response;
    })

  }
  Izlaz() {
    localStorage.setItem("fakturaId"," ")
    this.router.navigate(['fakture']);
  }
  BrisanjeArtikla(id:number) {
    this.service.deleteArtikalId(id).subscribe((response)=>{})
    window.location.reload()
    console.log(id)
  }
  UpdateArtikal(id:number) {
    localStorage.setItem("artikalId",id.toString())
    const dialogRef=this.dialog.open(ArtikalUpdateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  CreateArtikal() {
    const dialogRef=this.dialog.open(ArtikalCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  UpdateFaktura() {
    const dialogRef=this.dialog.open(FakturaUpdateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}