import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import primePtBr from 'primelocale/pt-br.json';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment.development';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private theme = inject(ThemeService);
  private language = inject(LanguageService);
  private config = inject(PrimeNGConfig);

  public constructor() {
    console.log(
      `Angular is using ${environment.production ? 'production' : 'development'} variables`
    );

    this.config.ripple = true;
    this.config.setTranslation(primePtBr['pt-br']);

    afterNextRender(() => {
      this.theme.loadCurrentTheme();
      this.language.use(this.language.current);
    });
  }
}
