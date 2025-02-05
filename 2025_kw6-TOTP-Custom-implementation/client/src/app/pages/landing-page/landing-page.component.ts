import { Component, OnInit } from '@angular/core';
import { TotpItemComponent } from '../../components/totp-item/totp-item.component';
import { CommonModule } from '@angular/common';
import { TotpService } from '../../services/totp.service';
import { TotpItem } from '../../models/totp-item.model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [TotpItemComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  constructor(protected totpService: TotpService) {}

  protected topts: TotpItem[] = [];

  public async ngOnInit() {
    this.topts = this.totpService.getAll();
  }
}
