import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public flag_right_window: string = 'banners';

  // Controller to show options on the right side of the modal
  public changeFlagViewRightSide(event: any): void {
    this.flag_right_window = event;
  }
}
