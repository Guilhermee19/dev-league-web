import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  offcanvasTopAnimation,
  slideInAnimation,
} from '@app/animations/route-animation';
import { IconDirective } from '@app/directives/icon.directive';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { LangSelectComponent } from '../shared/lang-select/lang-select.component';
import { PageErrorComponent } from '../shared/page-error/page-error.component';
import { PageLoadingComponent } from '../shared/page-loading/page-loading.component';
import { ToggleThemeComponent } from '../shared/toggle-theme/toggle-theme.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    RouterOutlet,
    IconDirective,
    LangSelectComponent,
    PageLoadingComponent,
    PageErrorComponent,
    ToggleThemeComponent,
  ],
  templateUrl: './navbar.component.html',
  animations: [slideInAnimation, offcanvasTopAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public loading = false;
  public error = 0;
}
