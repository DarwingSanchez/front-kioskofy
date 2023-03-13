import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simple-alert',
  templateUrl: './simple-alert.component.html',
  styleUrls: ['./simple-alert.component.css']
})
export class SimpleAlertComponent implements OnInit {
  @Input() img_src: any;
  @Input() title = '';
  @Input() msg = '';
  @Input() btn_msg = '';
  @Input() close_callback = () => {};

  constructor(public active_modal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log('this.img_src', this.img_src);
    this.getImage();
  }
  
  getImage() {
    switch (this.img_src) {
      case 'alert':
        this.img_src = '../../../assets/alerts/icon-alert.png';
        break;
      case 'warning':
        this.img_src = '../../../assets/alerts/icon-warning.png';
        break;
      case 'ok':
        this.img_src = '../../../assets/alerts/icon-check-verde.png';
        break;
      case 'wait':
        this.img_src = '../../../assets/alerts/icon-waiting.png';
        break;
      default:
        this.close_callback();
        break;
    }
  }
  onClose() {
    this.active_modal.close('Close click');
    this.close_callback();
  }
}
