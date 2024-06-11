import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarprogramaComponent } from './asociarprograma.component';

describe('AsociarprogramaComponent', () => {
  let component: AsociarprogramaComponent;
  let fixture: ComponentFixture<AsociarprogramaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsociarprogramaComponent]
    });
    fixture = TestBed.createComponent(AsociarprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
