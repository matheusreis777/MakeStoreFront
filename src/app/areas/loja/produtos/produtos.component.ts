import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { GenericService } from '../../../shared/services/generic.service';
import { Produto } from '../../../shared/models/produto.model';
import { Urlproduto } from '../../../shared/Util/url/produto/url-produto';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  standalone: true,
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  imports: [CommonModule, MatPaginatorModule]
})
export class ProdutosComponent implements OnInit {
  token: string | undefined;
  dataSource: Produto[] = [];
  totalProdutos = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private storage: StorageService,
    private produtoService: GenericService<Produto>
  ) {
    this.token = this.storage.getData('token');
  }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() { 
    this.produtoService.getItemsProdutos<Produto[]>(Urlproduto.Obter).subscribe((resultado) => {
      console.log(resultado);
      this.dataSource = resultado;
      this.totalProdutos = resultado.length;
    });
  }

  get produtosPaginados(): Produto[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.dataSource.slice(startIndex, startIndex + this.pageSize);
  }

  paginar(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
