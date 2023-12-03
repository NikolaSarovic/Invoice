import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikalDeleteComponent } from './artikal-delete.component';

describe('ArtikalDeleteComponent', () => {
  let component: ArtikalDeleteComponent;
  let fixture: ComponentFixture<ArtikalDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtikalDeleteComponent]
    });
    fixture = TestBed.createComponent(ArtikalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
