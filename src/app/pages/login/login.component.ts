import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { zoomInAnimation } from '@app/animations/route-animation';
import { ForgotPasswordComponent } from '@app/components/modals/forgot-password/forgot-password.component';
import { IconDirective } from '@app/directives/icon.directive';
import { AuthService } from '@app/services/auth.service';
import { BodyJson } from '@app/services/http.service';
import { StorageService } from '@app/services/storage.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    DividerModule,
    IconDirective,
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    PasswordModule,
    ConfirmDialogModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  animations: [zoomInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, DialogService],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  public loading = signal(false);
  private storage = inject(StorageService);
  private confirmationService = inject(ConfirmationService);
  private dialogService = inject(DialogService);
  private translateService = inject(TranslateService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  public ngOnInit(): void {
    this.awaitRemember();
  }

  public handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const body = this.form.value as BodyJson;
    this.authService.login(body).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.authService.setToken(response.token, body['remember'] as boolean);
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  public handleForgotPasswordButton() {
    const header = this.translateService.instant('login.forgot.header');
    this.dialogService.open(ForgotPasswordComponent, {
      header,
      data: { email: this.form.controls.email.value },
    });
  }

  private awaitRemember() {
    this.form.controls.remember.valueChanges.subscribe((value) => {
      if (!value) return;
      if (this.storage.cookies) return;
      this.openCookieDialog();
    });
  }

  private openCookieDialog() {
    const header = this.translateService.instant('login.cookies.header');
    const message = this.translateService.instant('login.cookies.message');
    this.confirmationService.confirm({
      header,
      message,
      icon: 'pi pi-info-circle',
      rejectButtonStyleClass: 'p-button-outlined',
      blockScroll: true,
      reject: () => {
        this.form.get('remember')?.setValue(false);
      },
      accept: () => {
        this.storage.cookies = true;
      },
    });
  }
}
