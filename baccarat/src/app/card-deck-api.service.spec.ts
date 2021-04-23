import { TestBed } from '@angular/core/testing';

import { CardDeckAPIService } from './card-deck-api.service';

describe('CardDeckAPIService', () => {
  let service: CardDeckAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardDeckAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
