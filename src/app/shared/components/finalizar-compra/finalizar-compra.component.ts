import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Carrinho } from '../../models/carrinho.model';
import { GenericService } from '../../services/generic.service';

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

  tipoPagamento: string[] = ['Dinheiro', 'Pix'];

  constructor(
    public dialogRef: MatDialogRef<FinalizarCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carrinhoService: GenericService<Carrinho>
  ) {
    this.carrinho = data.data;
    this.valorTotal = data.valorTotal;
  }

  ngOnInit() {
    
  }
}
