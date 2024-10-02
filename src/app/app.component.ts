import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../environments/environment.development';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private theme = inject(ThemeService);
  private translate = inject(TranslateService);
  private config = inject(PrimeNGConfig);

  public constructor() {
    console.log(
      `Angular is using ${environment.production ? 'production' : 'development'} variables`
    );

    this.config.ripple = true;

    this.translate
      .get('primeng')
      .subscribe((res) => this.config.setTranslation(res));

    afterNextRender(() => {
      this.theme.loadCurrentTheme();
    });
  }
}
