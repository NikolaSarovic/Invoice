import { Component } from '@angular/core';
import { FaktureService } from 'app/fakture/services/fakture.service';

@Component({
  selector: 'app-artikal-delete',
  templateUrl: './artikal-delete.component.html',
  styleUrls: ['./artikal-delete.component.css']
})
export class ArtikalDeleteComponent {

  constructor(private service:FaktureService) {

  }
  artId=(localStorage.getItem('artikalId')) as unknown as number

  Potvrda() {
    this.service.deleteArtikalId(this.artId).subscribe((response:any)=>{})
    setTimeout(()=>{ window.location.reload()},500)
  }
}
