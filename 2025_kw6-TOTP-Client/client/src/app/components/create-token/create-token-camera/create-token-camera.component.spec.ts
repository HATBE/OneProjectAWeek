import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTokenCameraComponent } from './create-token-camera.component';

describe('CreateTokenCameraComponent', () => {
  let component: CreateTokenCameraComponent;
  let fixture: ComponentFixture<CreateTokenCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTokenCameraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTokenCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
