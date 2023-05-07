import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcumber',
  templateUrl: './breadcumber.component.html',
  styleUrls: ['./breadcumber.component.css']
})
export class BreadcumberComponent implements OnInit {
menuItems: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.root);
    
  //    this.router.events
  //     .pipe()
  //     .subscribe(() => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root));
  }

}
