import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnChanges {
  @Input() portfolio!: any;
  public image_selected!: string;
  public images_seleceted_is_video: boolean = false;

  constructor() {}

  ngOnChanges(): void {
    if (this.portfolio && !this.image_selected) this.image_selected = this.portfolio.images[0];
  }

  // Change the image selected for the gallery (input comse from component "thumbnail")
  public changeImage(event: any) {
    this.images_seleceted_is_video = event.type === 'video' ? true : false
    this.image_selected = event.url;
  }
}
