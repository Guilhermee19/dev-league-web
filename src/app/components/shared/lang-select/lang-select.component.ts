import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '@app/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-lang-select',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './lang-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TranslateService],
})
export class LangSelectComponent implements OnInit {
  private language = inject(LanguageService);

  public langs = ['pt-br', 'en'];
  public selected = new FormControl(this.langs[0]);
  public valueChanges = this.selected.valueChanges.pipe(takeUntilDestroyed());

  public ngOnInit(): void {
    this.selected.setValue(this.language.current);
    this.valueChanges.subscribe(this.selectLang.bind(this));
  }

  public selectLang(lang: string | null) {
    if (!lang) return;
    this.language.use(lang);
  }
}
