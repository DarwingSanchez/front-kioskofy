import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-detail-description',
  templateUrl: './portfolio-detail-description.component.html',
  styleUrls: ['./portfolio-detail-description.component.css']
})
export class PortfolioDetailDescriptionComponent {
  @Input() description!: any;
}
