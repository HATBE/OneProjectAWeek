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

  protected form: FormGroup;

  public constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      cameraId: -1,
    });
  }

  protected onCameraSelected() {
    const cameraId = this.form.getRawValue().cameraId;
    const selectedCamera = this.availableCameras.find((camera) => camera.deviceId === cameraId);
    if (selectedCamera) {
      this.cameraSelected.emit(selectedCamera);
    }
  }
}
