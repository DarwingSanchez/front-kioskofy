import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-portfolio-detail-thumbnails',
  templateUrl: './portfolio-detail-thumbnails.component.html',
  styleUrls: ['./portfolio-detail-thumbnails.component.css']
})
export class PortfolioDetailThumbnailsComponent {
  @Input() video: string = '';
  @Input() images: string[] = [];
  @Input() image_selected: string = '-';

  @Input() is_card: boolean = false;

  @Output() changeImage = new EventEmitter();

  public selectImage(image: string, flag_location: string) {
    this.changeImage.emit({event: Event, url: image, type: flag_location});
  }
}