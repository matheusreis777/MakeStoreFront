import { Produto } from "./produto.model";

export class Usuario {
    nome!: string;
    email!: string;
    senhaHash!: string;
    produtos: Produto[] = [];
}