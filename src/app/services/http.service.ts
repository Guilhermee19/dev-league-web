import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '@env';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { catchError, retry, throwError } from 'rxjs';
import { ObjectService } from './object.service';
import { StorageService } from './storage.service';

export interface BodyJson {
  [key: string]: unknown;
}

export interface HttpConfig {
  token: boolean;
}

export interface HttpError {
  [key: string]: string | string[];
}

type BodyTypes = BodyJson | HttpParams | FormData;
type ApplicationsTypes =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | '';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private messageService = inject(MessageService);
  private objectService = inject(ObjectService);
  private translateService = inject(TranslateService);

  public base_url = environment.base_url;
  private repeat = 1;

  private getBodyType(body: BodyTypes): ApplicationsTypes {
    if (!(body instanceof HttpParams || body instanceof FormData)) {
      this.objectService.removeEmptyValues(body);
    }

    if (body instanceof FormData) return '';
    return body instanceof HttpParams
      ? 'application/x-www-form-urlencoded'
      : 'application/json';
  }

  private getUrl(url: string) {
    if (url.includes('http')) return url;
    return this.base_url + url;
  }

  private getHeaders(
    application: ApplicationsTypes = 'application/json',
    config: HttpConfig
  ) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept-Language', this.translateService.currentLang);

    if (application) {
      headers = headers.set('Content-Type', application);
    }

    if (this.storage.token && config.token) {
      headers = headers.set('Authorization', 'token ' + this.storage.token);
    }

    return headers;
  }

  private handleError = (error: HttpErrorResponse) => {
    const body = error.error;
    this.messageService.add({
      severity: 'error',
      summary:
        this.translateService.instant('global.error') + ` ${error.status}`,
      detail:
        body.detail ||
        body.non_field_errors ||
        error.message ||
        error.statusText ||
        'Erro desconhecido',
    });

    return throwError(() => error);
  };

  private validateConfig(config?: HttpConfig) {
    if (!config) config = {} as HttpConfig;
    if (typeof config.token !== 'boolean') config.token = true;
    return config;
  }

  /**
   * ### Método GET
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição
   *
   * *O Content-Type é application/json*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  public get<T>(url: string, params?: HttpParams, config?: HttpConfig) {
    config = this.validateConfig(config);
    const headers = this.getHeaders('application/json', config);
    return this.http
      .get<T>(this.getUrl(url), { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método POST
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição.
   *
   * *O Content-Type será automático com base no tipo de seu body*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param body Corpo da requisição
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  public post<T>(
    url: string,
    body: HttpParams | BodyJson | FormData,
    params?: HttpParams,
    config?: HttpConfig
  ) {
    const application = this.getBodyType(body);
    config = this.validateConfig(config);
    const headers = this.getHeaders(application, config);
    const _body =
      application === 'application/json' ? JSON.stringify(body) : body;

    return this.http
      .post<T>(this.getUrl(url), _body, {
        headers,
        params,
      })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método PATCH
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição.
   *
   * *O Content-Type será automático com base no tipo de seu body*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param body Corpo da requisição
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  public patch<T>(
    url: string,
    body: HttpParams | BodyJson,
    params?: HttpParams,
    config?: HttpConfig
  ) {
    const application = this.getBodyType(body);
    config = this.validateConfig(config);
    const headers = this.getHeaders(application, config);
    const _body =
      application === 'application/json' ? JSON.stringify(body) : body;

    return this.http
      .patch<T>(this.getUrl(url), _body, { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método DELETE
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição
   *
   * *O Content-Type é application/json*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  public delete<T>(url: string, params?: HttpParams, config?: HttpConfig) {
    config = this.validateConfig(config);
    const headers = this.getHeaders('application/json', config);
    return this.http
      .delete<T>(this.getUrl(url), { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Tratamento de erro para formulários
   * Espera receber um formulario do tipo FormGroup e um erro da requisição.
   * O erro é tratado e os campos do formulario são marcados como inválidos.
   *
   * Não se preocupe se o campo não existir, o erro será ignorado.
   * Tabém tratamos caso o formato dos erros seja diferente do esperado.
   *
   * @param form Formulário do tipo FormGroup
   * @param error Erro da requisição
   */
  public formErrorHandler(form: FormGroup, errors: HttpError) {
    if (!errors) return;
    for (const key in errors) {
      if (form.get(key)) {
        const value = errors[key];
        if (typeof value === 'string') {
          form.get(key)?.setErrors({ server: value });
        } else if (value.length) {
          form.get(key)?.setErrors({ server: value[0] });
        }
      }
    }
  }
}
