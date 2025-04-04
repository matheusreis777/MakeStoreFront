import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Produto } from '../../../shared/models/produto.model';
import { GenericService } from '../../../shared/services/generic.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Carrinho } from '../../../shared/models/carrinho.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { FinalizarCompraComponent } from '../../../shared/components/finalizar-compra/finalizar-compra.component';
import { UrlCarrinho } from '../../../shared/Util/url/carrinho/url-carrinho';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class CarrinhoComponent implements OnInit {
  loading: boolean = false;
  token: string | undefined;
  email: string | undefined;
  valorTotal: number = 0; 
  carrinho: Carrinho[] = [];

  constructor(
    private carrinhoService: GenericService<Produto>,
    private storage: StorageService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.token = this.storage.getData('token');
    this.email = this.storage.getData('email');
  }

  ngOnInit() {
    this.obterCarrinho();
  }

  obterCarrinho() {
    this.loading = true;

    this.carrinhoService
      .getItems(`${UrlCarrinho.ObterCarrinho}/${this.email}`)
      .subscribe({
        next: (resultado: any) => {
          this.carrinho = resultado;
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

  removeItem(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      data: {
        titulo: 'Confirmação',
        mensagem: 'Deseja realmente remover este item  do seu carrinho?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.excluirItemCarrinho(item.id);
      }
    });
  }

  excluirItemCarrinho(id: number) {
    this.carrinhoService
      .deleteItems(`${UrlCarrinho.RemoverCarrinho}/${id}`)
      .subscribe({
        next: (resultado: any) => {
          this.toastr.success('Item removido com sucesso!', 'Sucesso!');
          this.obterCarrinho();
        },
        error: (erro) => {
          this.toastr.error('Erro ao excluir item do carrinho!', 'Erro!');
          console.error('Erro ao excluir item do carrinho:', erro);
        },
      });
  }

  calcularTotal() {
    let total = 0;
    this.carrinho.forEach((item) => {
      total += Number(item.price) * item.quantidade;
    });
  
    this.valorTotal = total;
    return total;
  }
  

  finalizarComprar() {
    const dialog = this.dialog.open(FinalizarCompraComponent, {
      width: 'auto',
      data: {
        valorTotal: this.valorTotal,
        data: this.carrinho,
      },
    });
  }
}
