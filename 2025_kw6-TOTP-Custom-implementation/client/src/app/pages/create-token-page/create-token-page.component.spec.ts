import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTokenPageComponent } from './create-token-page.component';

describe('CreateTokenPageComponent', () => {
  let component: CreateTokenPageComponent;
  let fixture: ComponentFixture<CreateTokenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTokenPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTokenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
