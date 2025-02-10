import { Component, Input } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.css',
})
export class ErrorBannerComponent {
  @Input() title: string | null = null;
  @Input() message: string = 'NO MESSAGE';
  @Input() internalLink: string | null = null;
  @Input() httpLink: string | null = null;
  @Input() httpLinkTitle: string | null = null;
  @Input() target: string = '_blank';
}
