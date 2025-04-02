// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../models/usuario.model';
import { UsuarioLogin } from '../models/usuario-login.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl + '/usuario';

    constructor(private http: HttpClient) { }

    cadastrar(usuario: Usuario): Observable<any> {
        return this.http.post(`${this.apiUrl}/registrar`, usuario);
    }

    login(usuarioLogin: UsuarioLogin): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, usuarioLogin);
    }
}
