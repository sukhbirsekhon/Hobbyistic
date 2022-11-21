import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHobbyComponent } from './edit-hobby.component';

describe('EditHobbyComponent', () => {
  let component: EditHobbyComponent;
  let fixture: ComponentFixture<EditHobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
