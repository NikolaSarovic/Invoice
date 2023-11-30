import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikalCreateComponent } from './artikal-create.component';

describe('ArtikalCreateComponent', () => {
  let component: ArtikalCreateComponent;
  let fixture: ComponentFixture<ArtikalCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtikalCreateComponent]
    });
    fixture = TestBed.createComponent(ArtikalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
