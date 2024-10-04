import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  offcanvasTopAnimation,
  slideInAnimation,
} from '@app/animations/route-animation';
import { IconDirective } from '@app/directives/icon.directive';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { LangSelectComponent } from '../shared/lang-select/lang-select.component';
import { PageErrorComponent } from '../shared/page-error/page-error.component';
import { PageLoadingComponent } from '../shared/page-loading/page-loading.component';

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
  ],
  templateUrl: './navbar.component.html',
  animations: [slideInAnimation, offcanvasTopAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  public items: MenuItem[] | undefined;
  public loading = false;
  public error = 0;

  public ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'home',
        routerLink: '/',
      },
      {
        label: 'Features',
        icon: 'star',
      },
      {
        label: 'Projects',
        icon: 'magnifying_glass',
        items: [
          {
            label: 'Core',
            icon: 'bolt',
            shortcut: '⌘+S',
          },
          {
            label: 'Blocks',
            icon: 'server',
            shortcut: '⌘+B',
          },
          {
            label: 'UI Kit',
            icon: 'pencil',
            shortcut: '⌘+U',
          },
          {
            separator: true,
          },
          {
            label: 'Templates',
            icon: 'palette',
            items: [
              {
                label: 'Apollo',
                icon: 'palette',
                badge: '2',
              },
              {
                label: 'Ultima',
                icon: 'palette',
                badge: '3',
              },
            ],
          },
        ],
      },
      {
        label: 'Contact',
        icon: 'envelope',
        badge: '3',
      },
    ];
  }
}
