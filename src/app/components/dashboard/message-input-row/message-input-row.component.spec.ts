import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageInputRowComponent} from './message-input-row.component';

describe('MessageInputRowComponent', () => {
  let component: MessageInputRowComponent;
  let fixture: ComponentFixture<MessageInputRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageInputRowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageInputRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
