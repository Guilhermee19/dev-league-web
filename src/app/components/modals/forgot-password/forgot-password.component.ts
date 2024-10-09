import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TranslateModule,
    RippleModule,
  ],
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  private dialogConfig = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private translateService = inject(TranslateService);

  public constructor() {
    this.dialogConfig.styleClass = 'w-full max-w-96';
  }

  public loading = signal(false);
  public form = this.fb.nonNullable.group({
    email: [
      this.dialogConfig.data.email as string,
      [Validators.required, Validators.email],
    ],
  });

  public handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    this.setLoading(true);
    this.authService.forgotPassword(this.form.value).subscribe({
      next: () => {
        this.setLoading(false);
        const summary = this.translateService.instant('global.success');
        const detail = this.translateService.instant('login.forgot.success');
        this.messageService.add({
          severity: 'success',
          summary,
          detail,
        });

        this.dialogRef.close();
      },
      error: () => {
        this.setLoading(false);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.loading.set(loading);
  }

  public cancel() {
    this.dialogRef.close();
  }
}
