import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UtilitiesRowComponent} from './utilities-row.component';

describe('UtilitiesRowComponent', () => {
  let component: UtilitiesRowComponent;
  let fixture: ComponentFixture<UtilitiesRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilitiesRowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
