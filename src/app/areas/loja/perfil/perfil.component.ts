import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { GenericService } from '../../../shared/services/generic.service';
import { Usuario } from '../../../shared/models/usuario.model';
import { UrlUsario } from '../../../shared/Util/url/usuario/url-usuario';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule],
})
export class PerfilComponent {
  userForm: FormGroup;
  email: string = '';
  usuario: any;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: GenericService<Usuario>,
    private storage: StorageService
  ) {
    this.email = this.storage.getData('email');
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.buscarUsuario();
  }
  buscarUsuario() {
   this.loading = true;
   
       this.usuarioService
         .getItems(`${UrlUsario.ObterUsuario}/${this.email}`)
         .subscribe({
           next: (resultado: any) => {
             this.usuario = resultado;
             console.log(this.usuario);
           },
           error: (erro) => {
             this.loading = false;
             console.error('Erro ao carregar produtos:', erro);
           },
           complete: () => {
             this.loading = false;
           },
         });
  }
}
