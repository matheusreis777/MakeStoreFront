import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericService } from '../../services/generic.service';
import { Compra } from '../../models/compra.model';
import { ToastrService } from 'ngx-toastr';
import { UrlCompra } from '../../Util/url/compra/url-compra';
import { time } from 'console';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FinalizarCompraComponent implements OnInit {
  carrinho: any;
  valorTotal: number = 0;
  compraForm!: FormGroup;
  tipoPagamento: string | null = null;
  formasPagamento: string[] = ['Dinheiro', 'Pix'];
  email: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FinalizarCompraComponent>,    
    private compraService: GenericService<Compra>,
    private toastr: ToastrService,
  ) {
    this.email = data.email;
    this.valorTotal = data.valorTotal;
    this.carrinho = data.data;
  }

  ngOnInit() {
    this.montarFormulario();
  }

  montarFormulario() {
    this.compraForm = new FormGroup({
      email: new FormControl(this.email),
      formaPagamento: new FormControl(this.tipoPagamento),
      valor: new FormControl(this.valorTotal),
      produtoId: new FormControl([]),
    });
  }

  finalizarCompra() {
    if(this.tipoPagamento == null){
      this.dialogRef.close(false);
      return;
    }

    var listaIdProduto = this.carrinho.map((produto: any) => produto.id);
    this.compraForm.patchValue({
      email: this.email,
      formaPagamento: this.tipoPagamento,
      valor: this.valorTotal,
      produtoId: listaIdProduto,
    });
    var model = this.compraForm.value;

    this.compraService.postItems(UrlCompra.Salvar, model).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao finalizar compra:', err);
        alert('Erro ao finalizar a compra. Tente novamente.');
      }
    });
  }

  aoSelecionarTipoPaagamento() {
    if (this.tipoPagamento === "Pix") {
      setTimeout(() => {
        this.finalizarCompra();
      }, 6000);
    }
    
  }
}
