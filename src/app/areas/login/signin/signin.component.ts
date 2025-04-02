import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';
import { ConstantesLocalStorage } from '../../../shared/Util/Constantes/constantes-local-storage';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  standalone: true,
  styleUrls: ['./signin.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ToastrModule]
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Login realizado com sucesso!', 'Sucesso!');
        console.log(response.token);
        this.storageService.setData(ConstantesLocalStorage.token, response.token);
        this.router.navigate(["/loja"]);
        
      },
      error: (erro) => {
        this.toastr.error('Erro ao realizar login!', 'Erro!');
      }
    });
  }
}
