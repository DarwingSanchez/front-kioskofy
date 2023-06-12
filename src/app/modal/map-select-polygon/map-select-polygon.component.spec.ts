import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectPolygonComponent } from './map-select-polygon.component';

describe('MapSelectPolygonComponent', () => {
  let component: MapSelectPolygonComponent;
  let fixture: ComponentFixture<MapSelectPolygonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSelectPolygonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
