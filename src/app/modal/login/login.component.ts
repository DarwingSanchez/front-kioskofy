import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  /**
   * Logged the user to his account,
   * if not valid, alert him/her
   */
  loginUser() {
    if(this.loginForm.valid) {
      console.log('TODO: LOGIN API', this.loginForm.value);
    }
  }

  /**
   * Close active modal
   */
  closeActiveModal() {
    this.activeModal.close('Close click');
  }
}