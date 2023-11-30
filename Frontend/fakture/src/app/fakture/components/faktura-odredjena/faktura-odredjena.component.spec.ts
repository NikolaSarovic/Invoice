import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturaOdredjenaComponent } from './faktura-odredjena.component';

describe('FakturaOdredjenaComponent', () => {
  let component: FakturaOdredjenaComponent;
  let fixture: ComponentFixture<FakturaOdredjenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FakturaOdredjenaComponent]
    });
    fixture = TestBed.createComponent(FakturaOdredjenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
