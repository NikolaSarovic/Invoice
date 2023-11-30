import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikalUpdateComponent } from './artikal-update.component';

describe('ArtikalUpdateComponent', () => {
  let component: ArtikalUpdateComponent;
  let fixture: ComponentFixture<ArtikalUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtikalUpdateComponent]
    });
    fixture = TestBed.createComponent(ArtikalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
