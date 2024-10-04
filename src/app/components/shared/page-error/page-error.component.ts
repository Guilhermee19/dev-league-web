import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { zoomInAnimation } from '@app/animations/route-animation';
import { IconDirective } from '@app/directives/icon.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'page-error',
  standalone: true,
  imports: [
    TranslateModule,
    IconDirective,
    RouterModule,
    ButtonModule,
    RippleModule,
  ],
  animations: [zoomInAnimation],
  templateUrl: './page-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageErrorComponent implements OnInit, OnChanges {
  @Input() public code = 0;
  private route = inject(ActivatedRoute);

  public translated = 'default';

  public ngOnInit() {
    this.code ||= this.route.snapshot.data['code'];
    this.translated = [500, 404, 403, 401, 400].includes(this.code)
      ? this.code.toString()
      : 'default';
  }

  public ngOnChanges() {
    this.ngOnInit();
  }
}
