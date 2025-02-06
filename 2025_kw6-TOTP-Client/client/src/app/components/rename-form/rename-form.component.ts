import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rename-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rename-form.component.html',
  styleUrl: './rename-form.component.css',
})
export class RenameFormComponent implements OnInit {
  @Input() origText: string = '';
  @Output() onRename: EventEmitter<string> = new EventEmitter();

  protected form: FormGroup;

  public constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      text: null,
    });
  }

  public ngOnInit(): void {
    this.form.patchValue({ text: this.origText });
  }

  protected onSubmit() {
    const text = this.form.getRawValue().text;

    console.log(text);

    if (text === '' || !text) {
      return;
    }

    this.onRename.emit(text);
  }
}
