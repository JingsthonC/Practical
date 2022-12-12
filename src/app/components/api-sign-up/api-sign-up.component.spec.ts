import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSignUpComponent } from './api-sign-up.component';

describe('ApiSignUpComponent', () => {
  let component: ApiSignUpComponent;
  let fixture: ComponentFixture<ApiSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
