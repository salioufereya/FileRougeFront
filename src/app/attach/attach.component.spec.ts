import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachComponent } from './attach.component';

describe('AttachComponent', () => {
  let component: AttachComponent;
  let fixture: ComponentFixture<AttachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttachComponent]
    });
    fixture = TestBed.createComponent(AttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
