import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm: UntypedFormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.signupForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      last_name: new UntypedFormControl('', [Validators.required]),
      cellphone: new UntypedFormControl('', [Validators.required, Validators.pattern("[0-9 ]{11}")]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required])
    });
  }

  /**
   * Logged the user to his account,
   * if not valid, alert him/her
   */
  signUpUser() {
    if(this.signupForm.valid) {
      console.log('TODO: SIGNUP API', this.signupForm.value);
    }
  }

  /**
   * Close active modal
   */
  closeActiveModal() {
    this.activeModal.close('Close click');
  }
}
