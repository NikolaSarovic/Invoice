import { Component } from '@angular/core';
import { FaktureService } from 'app/fakture/services/fakture.service';

@Component({
  selector: 'app-faktura-delete',
  templateUrl: './faktura-delete.component.html',
  styleUrls: ['./faktura-delete.component.css']
})
export class FakturaDeleteComponent {
  
  constructor(private service:FaktureService) {

  }
  IdFakture=(localStorage.getItem('fakturaId')) as unknown as number
  Potvrda() {
    this.service.deleteFaktura(this.IdFakture).subscribe((response:any)=>{})
    setTimeout(()=>{ window.location.reload()},500)
  }

}
