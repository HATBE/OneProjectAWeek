import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryComponent } from './components/memory/memory.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MemoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'memory';
}
