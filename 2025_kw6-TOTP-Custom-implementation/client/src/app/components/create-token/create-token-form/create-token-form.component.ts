import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TotpItemForm } from '../../../models/totp-item.model';
import { ErrorBannerComponent } from '../../banner/error-banner/error-banner.component';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { ValidationService } from '../../../services/validation.service';
import TokenCreator from '../token-creator';

@Component({
  selector: 'app-create-token-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorBannerComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './create-token-form.component.html',
  styleUrl: './create-token-form.component.css',
})
export class CreateTokenFormComponent implements TokenCreator {
  @Output() onCreate: EventEmitter<TotpItemForm> = new EventEmitter<TotpItemForm>();

  protected form: FormGroup;

  protected error: string | null = null;
  protected isLoading: boolean = false;

  public constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      secret: [null, Validators.required],
    });
  }

  protected onSubmit() {
    this.isLoading = true;
    this.error = null;

    if (this.form.invalid) {
      return this.setError('Please fill in all fields!');
    }

    const name = this.form.getRawValue().name;
    const secret = this.form.getRawValue().secret;

    if (!ValidationService.isValidTOTPSecret(secret)) {
      return this.setError('The Secret ist no valid');
    }

    if (!ValidationService.isValidName(name)) {
      return this.setError('The Name ist no valid');
    }

    this.onCreate.emit({ secret, name });
  }

  private setError(message: string): void {
    this.isLoading = false;
    this.error = message;
  }
}
