import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import primeEn from 'primelocale/en.json';
import primePtBr from 'primelocale/pt-br.json';
import { PrimeNGConfig } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-lang-select',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './lang-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSelectComponent implements OnInit {
  private translate = inject(TranslateService);
  private config = inject(PrimeNGConfig);

  public langs = ['pt-br', 'en'];
  public selected = new FormControl(this.langs[0]);
  public valueChanges = this.selected.valueChanges.pipe(takeUntilDestroyed());

  private primeLangs = {
    'pt-br': primePtBr['pt-br'],
    en: primeEn['en'],
  };

  public ngOnInit(): void {
    this.selected.setValue(this.translate.currentLang || this.langs[0]);
    this.valueChanges.subscribe(this.selectLang);
  }

  public selectLang(lang: string | null) {
    if (!lang) return;
    console.log('Selected lang:', lang);

    this.translate.use(lang);
    this.selected.setValue(lang);
    this.config.setTranslation(this.primeLangs[lang as 'pt-br' | 'en']);
  }
}
