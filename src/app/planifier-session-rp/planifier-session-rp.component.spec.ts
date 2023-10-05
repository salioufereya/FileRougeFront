import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierSessionRpComponent } from './planifier-session-rp.component';

describe('PlanifierSessionRpComponent', () => {
  let component: PlanifierSessionRpComponent;
  let fixture: ComponentFixture<PlanifierSessionRpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanifierSessionRpComponent]
    });
    fixture = TestBed.createComponent(PlanifierSessionRpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
