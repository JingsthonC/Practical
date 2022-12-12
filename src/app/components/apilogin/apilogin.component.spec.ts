import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiloginComponent } from './apilogin.component';

describe('ApiloginComponent', () => {
  let component: ApiloginComponent;
  let fixture: ComponentFixture<ApiloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
