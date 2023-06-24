import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  // Data from parent
  @Input() page_current: number = 1;
  @Input() page_total: number = 1;
  @Input() disableNextButton: boolean = false
  // Data to parent
  @Output() emitGoToPage = new EventEmitter();

  goToPreviousPage() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    if (this.page_current - 1 >= 0) this.page_current - 1
    this.emitGoToPage.emit({event: Event, page: this.page_current});
  }

  goToNextPage() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    if (this.page_current + 1 <= this.page_total) this.page_current + 1
    this.emitGoToPage.emit({event: Event, page: this.page_current});
  }

  goToPage(page: Number){
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.emitGoToPage.emit({event: Event, page: page});
  }
}
