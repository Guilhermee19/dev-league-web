import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import primePtBr from 'primelocale/pt-br.json';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment.development';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);
  private config = inject(PrimeNGConfig);

  public constructor() {
    console.log(
      `Angular is using ${environment.production ? 'production' : 'development'} variables`
    );

    this.config.ripple = true;

    afterNextRender(() => {
      this.theme.loadCurrentTheme();
    });
  }

  public ngOnInit() {
    this.config.setTranslation(primePtBr['pt-br']);
  }
}
