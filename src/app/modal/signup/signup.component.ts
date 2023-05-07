import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      cellphone: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{11}")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
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
