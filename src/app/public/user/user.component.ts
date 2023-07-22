import { Component } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public flag_right_window: string = 'banners';

  constructor (
    private userService: UsersService
  ) {/** */}

  // Controller to show options on the right side of the modal
  public changeFlagViewRightSide(event: 'banners' | 'password' | 'xxx' | 'logout'): void {
    if (event === 'logout') {
      this.userService.onSetUser(null);
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      return
    }
    this.flag_right_window = event;
  }
}
