import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-home-expansion-panel',
  templateUrl: './home-expansion-panel.component.html',
  styleUrls: ['./home-expansion-panel.component.css']
})
export class HomeExpansionPanelComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;
  
  constructor() {}

  ngOnInit(): void {
    console.log("TODO: Completar info exoansion panel")
  }
}
