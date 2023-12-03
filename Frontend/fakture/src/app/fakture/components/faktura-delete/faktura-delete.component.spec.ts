import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturaDeleteComponent } from './faktura-delete.component';

describe('FakturaDeleteComponent', () => {
  let component: FakturaDeleteComponent;
  let fixture: ComponentFixture<FakturaDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FakturaDeleteComponent]
    });
    fixture = TestBed.createComponent(FakturaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
