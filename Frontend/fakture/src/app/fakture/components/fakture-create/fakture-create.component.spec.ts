import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaktureCreateComponent } from './fakture-create.component';

describe('FaktureCreateComponent', () => {
  let component: FaktureCreateComponent;
  let fixture: ComponentFixture<FaktureCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaktureCreateComponent]
    });
    fixture = TestBed.createComponent(FaktureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
