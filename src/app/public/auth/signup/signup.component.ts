import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { UsersService } from 'src/app/core/services/users/users.service';
import { SimpleAlertComponent } from '../../../modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm: FormGroup;
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  private is_browser!: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public activeModal: NgbActiveModal,
    private usersService: UsersService,
    private modalService: NgbModal
    ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      type: new FormControl('regular', [Validators.required]),
      status: new FormControl('active', [Validators.required]),
      accepted_terms_conditions: new FormControl(false, [Validators.requiredTrue])
    });
    // Validates if the project is running on the server or the user in order to use browser functions
    this.is_browser = isPlatformBrowser(this.platformId);
  }

  // Create profile as a regular user
  signUpUser() {
    this.signupForm.markAllAsTouched();
    if(this.signupForm.invalid) return;
    lastValueFrom(this.usersService.signUp(this.signupForm.value))
      .then((resp: any) => {
        this.usersService.setUserAndTokenInLocalStorage(resp.data, resp.token);
        this.signupForm.reset();
        this.closeModal();
        if (this.is_browser) window.location.reload();
      })
      .catch((error: Error) => {
        this.alertUser('warning', '¡Oh oh!', 'Sorry, we are experiencing some problems, try again later');
        throw error;
      });
  }

  // Close the active modal
  closeModal() {
    this.activeModal.close('Close click');
  }

  // Open modal to alert the user
  private alertUser(img_flag: string, title: string, msg: string): void {
    const modalRef = this.modalService.open(SimpleAlertComponent, this.ng_modal_options);
    modalRef.componentInstance.img_src = img_flag;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.btn_msg = 'Volver';
    modalRef.componentInstance.close_callback = () => {
      this.closeModal()
    };
  }
}
