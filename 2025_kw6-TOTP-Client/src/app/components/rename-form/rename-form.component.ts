import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rename-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rename-form.component.html',
  styleUrl: './rename-form.component.css',
})
export class RenameFormComponent implements OnInit {
  @Input() input: string = '';
  @Output() onRename: EventEmitter<string> = new EventEmitter();

  private newText: string = '';

  public ngOnInit() {
    this.newText = this.input;
  }

  protected onInput(event: Event) {
    const div = event.target as HTMLDivElement;

    this.newText = div.innerHTML;
  }

  protected onSubmit() {
    if (this.newText === '' || !this.newText) {
      return;
    }

    this.onRename.emit(this.newText);
  }

  protected onSave() {
    this.onSubmit();
  }

  protected onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit();
    }
  }
}
