import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { UsersService } from 'src/app/core/services/users/users.service';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true };
  public loginForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private usersService: UsersService, private modalService: NgbModal) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  // Log in an existing user into the platform
  public async loginUser() {
    try {
      this.loginForm.markAllAsTouched();
      if(this.loginForm.invalid) return;
      let response = await lastValueFrom(this.usersService.login(this.loginForm.value))
        .then((resp: any) => { return resp })
      if(response.success) {
        this.usersService.setUserAndTokenInLocalStorage(response.data, response.token);
        this.loginForm.reset();
        this.alertUser('success', `¡Welcome ${response.data.name}!`, 'Enjoy Kiskofy, ¡tu tienda latina!');
      }
    } catch (error) {
      this.alertUser('warning', '¡Oh oh!', 'Sorry, we are experiencing some problems, try again later');
    }
  }

  // Close this modal
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