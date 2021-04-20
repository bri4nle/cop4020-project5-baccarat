import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBetCardComponent } from './player-bet-card.component';

describe('PlayerBetCardComponent', () => {
  let component: PlayerBetCardComponent;
  let fixture: ComponentFixture<PlayerBetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerBetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
