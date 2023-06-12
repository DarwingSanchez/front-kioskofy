import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent {
  @Input() img_src: string = '';
  @Input() title: string = '';
  @Input() msg: string = '';
  @Input() msg_alert: string = '';
  @Input() btn_msg: string = '';
  @Input() close_callback = () => {};

  public modal_images: any = {
    success: './assets/images/modal-success.png',
    alert: './assets/images/modal-alert.png',
    warning: './assets/images/modal-warning.png',
  }
  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close('Close click');
    this.close_callback();
  }
}
