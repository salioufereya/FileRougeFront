import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierProfComponent } from './calendrier-prof.component';

describe('CalendrierProfComponent', () => {
  let component: CalendrierProfComponent;
  let fixture: ComponentFixture<CalendrierProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendrierProfComponent]
    });
    fixture = TestBed.createComponent(CalendrierProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
