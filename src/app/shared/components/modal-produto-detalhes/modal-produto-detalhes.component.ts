import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericService } from '../../services/generic.service';
import { Produto } from '../../models/produto.model';
import { Urlproduto } from '../../Util/url/produto/url-produto';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-produto-detalhes',
  templateUrl: './modal-produto-detalhes.component.html',
  styleUrls: ['./modal-produto-detalhes.component.scss'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ModalProdutoDetalhesComponent {
  produto: any;
  produtoForm!: FormGroup;
  corSelecionada: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalProdutoDetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produtoService: GenericService<Produto>,
    private toastr: ToastrService
  ) {
    this.produto = data;
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  close() {
    this.dialogRef.close();
  }

  construirFormulario() {
    this.produtoForm = new FormGroup({
      brand: new FormControl(this.produto.brand),
      name: new FormControl(this.produto.name),
      price: new FormControl(this.produto.price),
      price_sign: new FormControl(this.produto.price_sign),
      currency: new FormControl(this.produto.currency),
      image_link: new FormControl(this.produto.image_link),
      product_link: new FormControl(this.produto.product_link),
      website_link: new FormControl(this.produto.website_link),
      description: new FormControl(this.produto.description),
      rating: new FormControl(this.produto.rating),
      category: new FormControl(this.produto.category),
      product_type: new FormControl(this.produto.product_type),
      tag_list: new FormControl(this.produto.tag_list),
      created_at: new FormControl(this.produto.created_at),
      updated_at: new FormControl(this.produto.updated_at),
      product_api_url: new FormControl(this.produto.product_api_url),
      api_featured_image: new FormControl(this.produto.api_featured_image),
      product_colors: new FormControl([]),
    });
  }

  selecionarCor(item: string[]) {
    this.produtoForm.get('product_colors')?.setValue([item]);
  }

  salvarCarrinho() {
    var corSelecionada = this.produtoForm.value.product_colors;
    if (corSelecionada != null) {
      var model = this.produtoForm.value;

      this.produtoService
        .postItems(Urlproduto.SalvarCarrinho, model)
        .subscribe(
          (response) => {
            this.toastr.success('Produto adicionado ao carrinho!', 'Sucesso!');
            this.dialogRef.close();
          },
          (error) => {
            this.toastr.error(
              'Erro ao adicionar produto ao carrinho!',
              'Erro!'
            );
            console.error('Erro ao adicionar produto ao carrinho:', error);
          }
        );
    } else {
      this.toastr.warning('Selecione uma cor!', 'Alerta!');
    }
  }
}
