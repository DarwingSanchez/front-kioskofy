import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExpansionPanelComponent } from './home-expansion-panel.component';

describe('HomeExpansionPanelComponent', () => {
  let component: HomeExpansionPanelComponent;
  let fixture: ComponentFixture<HomeExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeExpansionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
