import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SteganoComponent} from './stegano.component';

describe('SteganoComponent', () => {
  let component: SteganoComponent;
  let fixture: ComponentFixture<SteganoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SteganoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteganoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
