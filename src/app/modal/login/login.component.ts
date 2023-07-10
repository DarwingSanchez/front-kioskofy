import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: UntypedFormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required])
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