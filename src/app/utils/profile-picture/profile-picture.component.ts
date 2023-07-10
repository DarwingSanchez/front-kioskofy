import { Component, ElementRef, Input, OnChanges, Renderer2, ViewChild } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnChanges {
  @Input() profile_picture!: number;
  @Input() size: number = 30;
  public faUser = faUser;
  // Elements HTML
  @ViewChild('profile_picture_container', { static: true })
  public profile_picture_container!: ElementRef;

  constructor(private renderer: Renderer2) {};

  ngOnChanges(): void {
      if (this.size) {
        this.renderer.setStyle(this.profile_picture_container.nativeElement, 'width', this.size + 'px');
        this.renderer.setStyle(this.profile_picture_container.nativeElement, 'height', this.size + 'px');
      }
  }
}
