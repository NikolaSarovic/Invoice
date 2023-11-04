import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fakture';
  pageText = "Zdravo Nikola"

  counter = 0;
  countUp(){
    this.counter++;
  }
  countDown(){
    this.counter--;
  }
}
