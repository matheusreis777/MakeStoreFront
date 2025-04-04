import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericService } from '../../../shared/services/generic.service';
import { Compra } from '../../../shared/models/compra.model';
import { UrlCompra } from '../../../shared/Util/url/compra/url-compra';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UrlCarrinho } from '../../../shared/Util/url/carrinho/url-carrinho';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss'],
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class ListaComprasComponent implements OnInit {
  token: string | undefined;
  loading: boolean = false;
  email: string | undefined;

  constructor(
    private storage: StorageService,
    private compraService: GenericService<Compra>,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.email = this.storage.getData('email');
    this.token = this.storage.getData('token');
  }

  compras: Compra[] = [];

  ngOnInit() {
    this.obterCompras();
  }

  obterCompras() {
    this.loading = true;

    this.compraService.getItems(`${UrlCompra.Obter}/${this.email}`).subscribe({
      next: (resultado: any) => {
        console.log(resultado)
        this.compras = resultado;
      },
      error: (erro) => {
        this.loading = false;
        this.toastr.error('Erro ao obter compras!', 'Erro!');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

 

  removeItem(item: any) {
    console.log(item);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: 'auto',
        data: {
          titulo: 'Confirmação',
          mensagem: 'Deseja realmente remover essa compra?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.excluirItemCarrinho(item.id);
        }
      });
    }
  
    excluirItemCarrinho(id: number) {
      this.compraService
        .deleteItems(`${UrlCompra.Remover}/${id}`)
        .subscribe({
          next: (resultado: any) => {
            this.toastr.success('Item removido com sucesso!', 'Sucesso!');
            this.obterCompras();
          },
          error: (erro) => {
            this.toastr.error('Erro ao excluir compra!', 'Erro!');
          },
        });
    }

    
  verProdutos(compra: any) {
    console.log('Ver produtos da compra:', compra);
  }
}
