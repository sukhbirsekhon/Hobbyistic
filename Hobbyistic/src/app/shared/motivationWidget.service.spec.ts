import { TestBed } from '@angular/core/testing';
import { motivationWidgetService } from './motivationWidget.service';

describe('motivationWidgetService', () => {
  let service: motivationWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(motivationWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});