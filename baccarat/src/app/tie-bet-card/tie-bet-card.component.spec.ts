import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TieBetCardComponent } from './tie-bet-card.component';

describe('TieBetCardComponent', () => {
  let component: TieBetCardComponent;
  let fixture: ComponentFixture<TieBetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TieBetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TieBetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
