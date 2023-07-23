import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/core/services/users/users.service';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent {
  public passwordForm: UntypedFormGroup;
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };

  constructor(
    public activeModal: NgbActiveModal,
    private usersService: UsersService,
    private modalService: NgbModal
  ) {
    this.passwordForm = new UntypedFormGroup({
      password_old_1: new UntypedFormControl('', [Validators.required]),
      password_old_2: new UntypedFormControl('', [Validators.required]),
      password_new: new UntypedFormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    });
  }

  // 
  updatePassword() {
    this.activeModal.close('Close click');
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
