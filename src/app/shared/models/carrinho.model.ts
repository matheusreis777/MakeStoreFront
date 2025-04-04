import { ProdutoCores } from "./produto-cores.model";
import { Usuario } from "./usuario.model";

export class Carrinho {
    id!: number;
    brand!: string;
    name!: string;
    price!: string;
    description!: string;
    category!: string;
    api_featured_image!: string;
    quantidade!: number;
    usuarioId!: number;
    usuario!: Usuario[];
    product_colors!: ProdutoCores;
}