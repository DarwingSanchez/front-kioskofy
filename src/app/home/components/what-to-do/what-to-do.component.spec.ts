import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatToDoComponent } from './what-to-do.component';

describe('WhatToDoComponent', () => {
  let component: WhatToDoComponent;
  let fixture: ComponentFixture<WhatToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatToDoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
