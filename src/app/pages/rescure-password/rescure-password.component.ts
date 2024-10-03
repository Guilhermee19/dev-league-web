import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { zoomInAnimation } from '@app/animations/route-animation';
import { IconDirective } from '@app/directives/icon.directive';
import { FormErrorPipe } from '@app/pipes/form-error.pipe';
import { AuthService } from '@app/services/auth.service';
import { BodyJson } from '@app/services/http.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-rescure-password',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    RippleModule,
    IconDirective,
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    PasswordModule,
    RouterModule,
    FormErrorPipe,
  ],
  animations: [zoomInAnimation],
  templateUrl: './rescure-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, DialogService],
})
export class RescurePasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private translate = inject(TranslateService);
  public loading = signal(false);

  public form = this.fb.group({
    forgot_password_hash: [''],
    email: [''],
    new_password: ['', Validators.required],
    confirm_password: ['', [Validators.required, this.samePassword()]],
  });

  public ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const { email, hash } = params;
      if (!email || !hash) {
        this.router.navigate(['/']);
      }

      this.form.patchValue({ email, forgot_password_hash: hash });
    });
  }

  public handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const body = this.form.value as BodyJson;
    this.authService.rescurePassword(body).subscribe({
      next: () => {
        const summary = this.translate.instant('rescure_password.success');
        const detail = this.translate.instant(
          'rescure_password.success_detail'
        );
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
        if (password !== this.form.value.new_password) {
          return { diff_password: true };
        }
      }
      return null;
    };
  }
}
