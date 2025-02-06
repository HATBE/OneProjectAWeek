import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TotpService } from '../../services/totp.service';
import { CreateTokenCameraComponent } from '../../components/create-token/create-token-camera/create-token-camera.component';
import { CreateTokenFormComponent } from '../../components/create-token/create-token-form/create-token-form.component';
import { TotpItemForm } from '../../models/totp-item.model';

@Component({
  selector: 'app-create-token-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateTokenCameraComponent, CreateTokenFormComponent],
  templateUrl: './create-token-page.component.html',
  styleUrl: './create-token-page.component.css',
})
export class CreateTokenPageComponent implements OnInit {
  protected manualEntry = false;

  public constructor(private totpService: TotpService, private router: Router) {}

  public ngOnInit() {}

  protected toggleManualEntry() {
    this.manualEntry = !this.manualEntry;
  }

  protected onCreate(totpItem: TotpItemForm) {
    this.totpService.create(totpItem.name, totpItem.secret);
    this.router.navigate(['/']);
  }
}
