import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent implements OnInit {
  @Input() title = 'Oh oh, nothing to see here';
  @Input() img = './assets/images/empty_state/desert.png';

  constructor() { }

  ngOnInit(): void {
  }

}
