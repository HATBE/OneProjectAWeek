import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TotpItem } from '../../models/totp.model';
import { CommonModule } from '@angular/common';
import { TotpService } from '../../services/totp.service';

@Component({
  selector: 'app-totp-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './totp-item.component.html',
  styleUrl: './totp-item.component.css',
})
export class TotpItemComponent implements OnInit, OnDestroy {
  @Input() key!: string;

  protected totpItem!: TotpItem;

  private intervalId: any;
  protected secsTilRefresh: number = 0;

  constructor(protected totpService: TotpService) {}

  ngOnInit() {
    this.generateNewToken();
    this.startInterval();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private startInterval() {
    this.intervalId = setInterval(() => {
      this.updateSecsTilRefresh();
    }, 1000);
  }

  protected updateSecsTilRefresh = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    this.secsTilRefresh = Math.max(0, this.totpItem.exp - currentTime);

    if (this.secsTilRefresh === 0) {
      this.onExpire();
    }
  };

  private onExpire() {
    this.generateNewToken();
  }

  private generateNewToken() {
    this.totpItem = this.totpService.generateTOTP(this.key);
  }
}
