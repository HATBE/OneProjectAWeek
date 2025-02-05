import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraSelectorComponent } from './camera-selector.component';

describe('CameraSelectorComponent', () => {
  let component: CameraSelectorComponent;
  let fixture: ComponentFixture<CameraSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CameraSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
