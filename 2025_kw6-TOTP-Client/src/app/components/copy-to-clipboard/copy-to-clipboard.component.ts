import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-to-clipboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copy-to-clipboard.component.html',
  styleUrl: './copy-to-clipboard.component.css',
})
export class CopyToClipboardComponent {
  @Input() textToCopy: string = '';

  copyBtnPressed = false;

  constructor() {}

  ngOnInit(): void {}

  onClickCopyToClipboard() {
    navigator.clipboard.writeText(this.textToCopy);
    this.copyBtnPressed = true;

    setTimeout(() => {
      this.copyBtnPressed = false;
    }, 2000);
  }
}
