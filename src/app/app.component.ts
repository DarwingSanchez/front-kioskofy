import { Component, OnInit } from '@angular/core';
import { faCoffee, faTrash} from '@fortawesome/free-solid-svg-icons';
import { UsersService } from './core/services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';
  public faCoffee = faCoffee;
  public faTrash = faTrash;

  constructor(
    private userService : UsersService
  ) {/** */}


  ngOnInit(): void {
    const user = window.localStorage.getItem('user');
    if (user) {
      this.userService.onSetUser(JSON.parse(user))
    }
  }
}
