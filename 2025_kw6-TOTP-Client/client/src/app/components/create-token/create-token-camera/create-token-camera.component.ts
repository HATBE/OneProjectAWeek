import { Component, EventEmitter, Output } from '@angular/core';
import { TotpItemForm } from '../../../models/totp-item.model';
import TokenCreator from '../token-creator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { OTPAuthData, OtpAuthParseService } from '../../../services/otpauth-parse.service';
import { ErrorBannerComponent } from '../../banner/error-banner/error-banner.component';
import { CameraSelectorComponent } from '../../camera-selector/camera-selector.component';

@Component({
  selector: 'app-create-token-camera',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    ErrorBannerComponent,
    CameraSelectorComponent,
  ],
  templateUrl: './create-token-camera.component.html',
  styleUrl: './create-token-camera.component.css',
})
export class CreateTokenCameraComponent implements TokenCreator {
  @Output() onCreate: EventEmitter<TotpItemForm> = new EventEmitter<TotpItemForm>();

  protected availableCameras: MediaDeviceInfo[] = [];
  protected selectedCamera: MediaDeviceInfo | undefined = undefined;

  protected error: string | null = null;
  protected isLoading: boolean = true;
  protected cameraEnabled = false;
  protected foundOtp: OTPAuthData | null = null;

  protected allowedFormats = [BarcodeFormat.QR_CODE];

  protected onSuccessfullScan(scan: string) {
    this.cameraEnabled = false;
    try {
      this.foundOtp = OtpAuthParseService.parseOTPAuthURL(scan);
    } catch (error) {
      this.setError('ERROR!');
    }
  }

  protected onCamerasFound(cameras: MediaDeviceInfo[]) {
    if (!cameras) {
      return alert('No Camera found :<');
    }
    this.availableCameras = cameras;

    if (this.availableCameras.length === 1) {
      this.selectedCamera = cameras[0];
      this.cameraEnabled = true;
    }
    this.isLoading = false;
  }

  protected handleCameraSelected(camera: MediaDeviceInfo) {
    this.selectedCamera = camera;
    this.cameraEnabled = true;
  }

  protected onSubmit() {
    if (!this.foundOtp) {
      return;
    }
    this.onCreate.emit({ secret: this.foundOtp.secret, name: this.foundOtp.label });
  }

  private setError(message: string): void {
    this.isLoading = false;
    this.error = message;
  }
}
