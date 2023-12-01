import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
today:string=''
 
ngOnInit() {
  this.today=new Date().toLocaleDateString("de-DE").toString()
}

/*OnToday():string {
   // const today = new Date().toISOString()
   const today=new Date().toLocaleDateString("de-DE");

    console.log(today.toString())
    return today.toString();
  }*/

}
