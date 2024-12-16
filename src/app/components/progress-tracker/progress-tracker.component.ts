import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-progress-tracker',
  imports: [],
  templateUrl: './progress-tracker.component.html',
  styleUrl: './progress-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressTrackerComponent {}
