import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the latest received message', async () => {
    component.isActive.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const history = fixture.nativeElement.querySelector('#history') as HTMLDivElement;
    Object.defineProperty(history, 'scrollHeight', { value: 500 });

    component.onReceive({ sender: 'Alice', message: 'Hello' });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(history.scrollTop).toBe(500);
  });
});
