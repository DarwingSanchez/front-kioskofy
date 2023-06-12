import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectRadiusComponent } from './map-select-radius.component';

describe('MapSelectRadiusComponent', () => {
  let component: MapSelectRadiusComponent;
  let fixture: ComponentFixture<MapSelectRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSelectRadiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
