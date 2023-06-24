import { Component, Inject, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { MapSelectRadiusComponent } from 'src/app/modal/map-select-radius/map-select-radius.component';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {
  public icon_map = faMapLocationDot;
  public search_location!: any;
  public window_current_osition = window.pageYOffset;
  private ng_modal_options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    keyboard: false,
    size: 'lg',
  };

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal
    ) {
    this._document.addEventListener('scroll', this.onContentScrolled)
  }

  async ngOnInit() {
    await this.getFilterLocation();
    this.startObservableFilterLocation();
  }

  // Get into local storage the filter location
  private async getFilterLocation() {
    await this.localStorageService.getItem('filter_location')
      .then((resp: any) => { 
        if(resp.lat && resp.lng) this.search_location = resp
      }).catch((error) => {
        throw error;
      })
  }

  // Start the filter location observable to keep track of changes in other components
  private startObservableFilterLocation(): void {
    this.localStorageService.filter_location$.subscribe((data: any) => { console.log('change', data) });
  }

  public openModalChangeSearchLocation():void {
    const modalRef = this.modalService.open(MapSelectRadiusComponent, this.ng_modal_options);
    modalRef.componentInstance.close_callback = () => {};
  }

  // Updates the value of the searchs radius
  public transformRadiusToKm(): string {
    return (this.search_location.radius / 500).toFixed(1);
  }

  onContentScrolled = (e: any) => {
    let scroll = window.pageYOffset;
    console.log('scroll', scroll, 'this.window_current_osition', this.window_current_osition, 'this.flag_scroll_up', this.flag_scroll_up);
    
    if (scroll > this.window_current_osition && this.flag_scroll_up) {
      console.log('scrollDown');
      this.flag_scroll_up = false;
    } else if(scroll < this.window_current_osition && !this.flag_scroll_up){
      console.log('scrollUp');
      this.flag_scroll_up = true;
    }
    this.window_current_osition = scroll;
  }
  flag_scroll_up = true;

}
