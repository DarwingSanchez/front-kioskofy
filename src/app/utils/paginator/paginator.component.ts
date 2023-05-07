import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  // Data from parent
  @Input() current_page: number = 1;
  @Input() total_pages: number = 1;
  @Input() disableNextButton: boolean = false
  // Data to parent
  @Output() emitGoToPage = new EventEmitter();

  /**
   * Call function to go to previous page
   */
  goToPreviousPage() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    if (this.current_page - 1 >= 0) this.current_page - 1
    this.emitGoToPage.emit({event: Event, page: this.current_page});
  }

  /**
   * Call function to go to next page
   */
  goToNextPage() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    if (this.current_page + 1 <= this.total_pages) this.current_page + 1
    this.emitGoToPage.emit({event: Event, page: this.current_page});
  }

  /**
   * Call function to go to a specific page
   */
  goToPage(page: Number){
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.emitGoToPage.emit({event: Event, page: page});
  }
}
