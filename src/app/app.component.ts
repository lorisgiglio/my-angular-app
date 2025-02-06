import { OfferService } from './offer.service'; // Import your service
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  offers:any;
  
  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offerService.getOffers().subscribe(
      data => {
        this.offers = data;
        console.log("Offers:", this.offers); // Check the data in the console
      },
      error => {
        // Handle errors here
        console.log("ERRORE");
      }
    );
  }


  title = 'Energy App';
}
