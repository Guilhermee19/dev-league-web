import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '@app/services/theme.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'toggle-theme',
  standalone: true,
  imports: [CommonModule, ButtonModule, RippleModule, ReactiveFormsModule],
  templateUrl: './toggle-theme.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./toggle-theme.component.scss'],
})
export class ToggleThemeComponent implements OnInit {
  private themeService = inject(ThemeService);

  public darkThemeControl = new FormControl(false);
  private valueChanges =
    this.darkThemeControl.valueChanges.pipe(takeUntilDestroyed());

  public ngOnInit(): void {
    this.darkThemeControl.setValue(this.themeService.theme === 'dark');
    this.valueChanges.subscribe(() => {
      this.themeService.toggleUserTheme();
    });
  }

  public toggleTheme(e: Event) {
    e.stopPropagation();
    this.darkThemeControl.setValue(!this.darkThemeControl.value);
  }
}
