import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { zoomInAnimation } from '@app/animations/route-animation';
import { IconDirective } from '@app/directives/icon.directive';
import { FormErrorPipe } from '@app/pipes/form-error.pipe';
import { AuthService } from '@app/services/auth.service';
import { BodyJson } from '@app/services/http.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
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
    RouterModule,
    FormErrorPipe,
  ],
  templateUrl: './register.component.html',
  animations: [zoomInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, DialogService],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private translate = inject(TranslateService);
  public loading = signal(false);

  public form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirm_password: ['', [Validators.required, this.samePassword()]],
  });

  public handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const body = this.form.value as BodyJson;
    this.authService.register(body).subscribe({
      next: () => {
        const summary = this.translate.instant('register.success');
        const detail = this.translate.instant('register.success_detail');
        this.loading.set(false);
        this.router.navigate(['/login']);
        this.messageService.add({
          severity: 'success',
          summary,
          detail,
        });
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  private samePassword() {
    return (control: AbstractControl) => {
      const password = control.value;
      if (password) {
        if (password !== this.form.value.password) {
          return { diff_password: true };
        }
      }
      return null;
    };
  }
}
