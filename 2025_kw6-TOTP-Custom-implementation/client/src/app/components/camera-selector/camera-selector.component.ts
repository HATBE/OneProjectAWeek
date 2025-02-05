import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camera-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './camera-selector.component.html',
  styleUrl: './camera-selector.component.css',
})
export class CameraSelectorComponent {
  @Input() availableCameras: MediaDeviceInfo[] = [];
  @Output() cameraSelected = new EventEmitter<MediaDeviceInfo>();

  cameraForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.cameraForm = this.formBuilder.group({
      cameraId: -1,
    });
  }

  onCameraSelected() {
    const cameraId = this.cameraForm.getRawValue().cameraId;
    const selectedCamera = this.availableCameras.find((camera) => camera.deviceId === cameraId);
    if (selectedCamera) {
      this.cameraSelected.emit(selectedCamera);
    }
  }
}
