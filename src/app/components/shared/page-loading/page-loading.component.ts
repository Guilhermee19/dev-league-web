import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'page-loading',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './page-loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoadingComponent {}
