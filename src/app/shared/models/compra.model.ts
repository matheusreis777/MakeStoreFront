import { Produto } from "./produto.model";
import { Usuario } from "./usuario.model";

export class Compra {
    id!: number;
    dataCompra!: Date;   
    valorTotal!: number;
    formaPagamento!: string;
    usuarioId!: string;
    produtos!: Produto[];
    email!: string;
}