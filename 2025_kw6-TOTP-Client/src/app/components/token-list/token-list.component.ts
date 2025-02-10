import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TotpService } from '../../services/totp.service';
import { TotpItem } from '../../models/totp-item.model';
import { TotpItemComponent } from '../totp-item/totp-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-token-list',
  standalone: true,
  imports: [CommonModule, TotpItemComponent, RouterModule],
  templateUrl: './token-list.component.html',
  styleUrl: './token-list.component.css',
})
export class TokenListComponent implements OnInit {
  constructor(protected totpService: TotpService) {}

  protected topts: TotpItem[] = [];

  public async ngOnInit() {
    this.updateList();
  }

  protected updateList() {
    this.topts = this.totpService.getAll();
  }
}
