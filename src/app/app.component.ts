import { Component } from '@angular/core';
import { faCoffee, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  public faCoffee = faCoffee;
  public faTrash = faTrash;
}