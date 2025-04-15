import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  loginCadastrarForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginCadastrarForm = this.fb.group(
      {
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, this.validaForcaSenha]],
        confirmarSenha: ['', Validators.required],
      },
      { validators: this.validaSenhasConfere }
    );
  }

  onSubmit() {
    if (this.loginCadastrarForm.invalid) {
      this.toastr.error('Preencha todos os campos corretamente!', 'Erro!');
      return;
    }
    this.authService.cadastrar(this.loginCadastrarForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso!');
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        this.toastr.error('Erro ao realizar cadastro!', 'Erro!');
      },
    });
  }

  validaSenhasConfere: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const senha = control.get('senha')?.value;
    const confirmarSenha = control.get('confirmarSenha')?.value;

    return senha && confirmarSenha && senha !== confirmarSenha
      ? { passwordMismatch: true }
      : null;
  };

  validaForcaSenha(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;

    // Pelo menos 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial
    const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;


    return strongPasswordRegex.test(value) ? null : { weakPassword: true };
  }

  get senha() {
    return this.loginCadastrarForm.get('senha');
  }

  get confirmarSenha() {
    return this.loginCadastrarForm.get('confirmarSenha');
  }
}
