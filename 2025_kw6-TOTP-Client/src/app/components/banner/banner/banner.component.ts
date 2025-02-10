import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  @Input() title: string | null = null;
  @Input() bannerClass: string = 'alert-info';
  @Input() bsIcon: string = 'bi-info-circle-fill';
  @Input() message: string = 'NO MESSAGE';
  @Input() httpLink: string | null = null;
  @Input() httpLinkTitle: string | null = null;
  @Input() target: string = '_blank';
}
