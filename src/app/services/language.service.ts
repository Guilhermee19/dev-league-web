import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import primeEn from 'primelocale/en.json';
import primePtBr from 'primelocale/pt-br.json';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  private plataformId = inject(PLATFORM_ID);
  private config = inject(PrimeNGConfig);

  private primeLangs = {
    'pt-br': primePtBr['pt-br'],
    en: primeEn['en'],
  };

  public use(lang: string) {
    localStorage.setItem('language', lang);
    this.config.setTranslation(this.primeLangs[lang as 'pt-br' | 'en']);
    this.translate.use(lang);
  }

  public get current() {
    const allLangs = this.translate.getLangs();
    const storageLang = isPlatformBrowser(this.plataformId)
      ? localStorage.getItem('language')
      : '';
    const browserLang = allLangs.includes(this.translate.getBrowserLang() || '')
      ? this.translate.getBrowserLang()?.toLocaleLowerCase()
      : '';

    return this.translate.currentLang || storageLang || browserLang || 'pt-br';
  }
}
