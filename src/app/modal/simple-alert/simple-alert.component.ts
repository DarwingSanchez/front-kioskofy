import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simple-alert',
  templateUrl: './simple-alert.component.html',
  styleUrls: ['./simple-alert.component.css']
})
export class SimpleAlertComponent implements OnInit {
  @Input() img_src: string = '';
  @Input() title: string = '';
  @Input() msg: string = '';
  @Input() msg_alert: string = '';
  @Input() btn_msg: string = '';
  @Input() close_callback = () => {};

  constructor(public active_modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.getImage();
  }
  
  public getImage(): string {
    switch (this.img_src) {
      case 'alert':
        return '../../../assets/alerts/icon-alert.png';
      case 'warning':
        return '../../../assets/alerts/icon-warning.png';
      case 'success':
        return '../../../assets/alerts/icon-check-verde.png';
      case 'wait':
        return '../../../assets/alerts/icon-waiting.png';
      default:
        this.close_callback();
        return '';
    }
  }

  public closeModal(): void {
    this.active_modal.close('Close click');
    this.close_callback();
  }
}
