import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankerBetCardComponent } from './banker-bet-card.component';

describe('BankerBetCardComponent', () => {
  let component: BankerBetCardComponent;
  let fixture: ComponentFixture<BankerBetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankerBetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankerBetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
