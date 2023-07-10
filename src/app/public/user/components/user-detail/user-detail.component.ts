import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { SimpleAlertComponent } from 'src/app/modal/simple-alert/simple-alert.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  public userForm: UntypedFormGroup;
  public icon_user = faUser;
  public user_id!: string;
  public ng_modal_options: NgbModalOptions = { keyboard: false, centered: true };
  @Output() eventEmitter = new EventEmitter();

  constructor(
    private usersService: UsersService,
    public activeModal: NgbActiveModal,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal
    ) {
    this.userForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      last_name: new UntypedFormControl('', [Validators.required]),
      phone: new UntypedFormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required]),
      type: new UntypedFormControl('', [Validators.required]),
      status: new UntypedFormControl('', [Validators.required]),
      accepted_terms_conditions: new UntypedFormControl(false, [Validators.requiredTrue])
    });
  }


  async ngOnInit() {
    try {
      await this.getUserID();
      this.getUserByID();
    } catch (error) {
      this.alertUser('warning', '¡Oh oh!', 'Sorry, we are experiencing some problems.');
    }
  }

  // Get the user ID from LS
  private getUserID(): any {
    this.localStorageService.getItem('user')
      .then((resp: any) => { 
        this.user_id = resp._id;
      }).catch((error) => {
        throw error;
      })
  }

 // Get the data for the user based on its ID
  public getUserByID() {
    lastValueFrom(this.usersService.getUserById(this.user_id))
      .then((resp: any) => {
        if(resp.success && resp.data && resp.data !== null) this.userForm.patchValue(resp.data);
        else this.alertUser('warning', '¡Oh oh!', 'Sorry, we are experiencing some problems.');
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Update the data for the user in the database
  public updateUser(): void {
    lastValueFrom(this.usersService.updateUserById(this.user_id, this.userForm.value))
      .then((resp: any) => {
        if(resp.success && resp.data && resp.data !== null) this.userForm.patchValue(resp.data);
        this.alertUser('success', '¡Great!', 'Your profile was updated.');
      })
      .catch((error: Error) => {
        this.alertUser('warning', '¡Oh oh!', 'Sorry, we are experiencing some problems.');
        this.closeModal();
      });
  }

  //
    public onEmiteValue(flag: 'banners' | 'password' | 'xxx'): void {
    this.eventEmitter.emit(flag)
  }

  // Close the active modal
  public closeModal(): void {
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
