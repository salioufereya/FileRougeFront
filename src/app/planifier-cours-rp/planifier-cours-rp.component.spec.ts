import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierCoursRpComponent } from './planifier-cours-rp.component';

describe('PlanifierCoursRpComponent', () => {
  let component: PlanifierCoursRpComponent;
  let fixture: ComponentFixture<PlanifierCoursRpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanifierCoursRpComponent]
    });
    fixture = TestBed.createComponent(PlanifierCoursRpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
