import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent implements OnInit {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl;
  @Input() type: 'text' | 'select' | 'textarea' = 'text';
  @Input() isRequired?: boolean;

  @HostBinding('class') class = 'form-field';

  htmlFor = this.label;

  ngOnInit(): void {
    if (
      this.isRequired === undefined &&
      this.control.hasValidator(Validators.required)
    ) {
      this.isRequired = true;
    }
    if (this.isRequired) {
      this.class += ' required';
    }
  }
}
