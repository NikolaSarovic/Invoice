import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaktureCreateDialogComponent } from './fakture-create-dialog.component';

describe('FaktureCreateDialogComponent', () => {
  let component: FaktureCreateDialogComponent;
  let fixture: ComponentFixture<FaktureCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaktureCreateDialogComponent]
    });
    fixture = TestBed.createComponent(FaktureCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
