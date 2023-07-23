import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-detail-location',
  templateUrl: './portfolio-detail-location.component.html',
  styleUrls: ['./portfolio-detail-location.component.css']
})
export class PortfolioDetailLocationComponent {
  @Input() locations!: any;
}
