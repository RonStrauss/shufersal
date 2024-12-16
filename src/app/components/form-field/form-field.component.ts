import { AsyncPipe, NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl;
  @Input() type: 'text' = 'text';
  @Input() isRequired?: boolean;

  htmlFor = this.label;

  isRequired$ = new BehaviorSubject<boolean | undefined>(this.isRequired);

  ngOnInit(): void {
    if (
      this.isRequired === undefined &&
      this.control.hasValidator(Validators.required)
    ) {
      this.isRequired$.next(true);
    }
  }
}
