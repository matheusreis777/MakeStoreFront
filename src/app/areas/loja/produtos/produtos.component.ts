import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { GenericService } from '../../../shared/services/generic.service';
import { Produto } from '../../../shared/models/produto.model';
import { Urlproduto } from '../../../shared/Util/url/produto/url-produto';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalProdutoDetalhesComponent } from '../../../shared/components/modal-produto-detalhes/modal-produto-detalhes.component';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-produtos',
  standalone: true,
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    FormsModule,
    MatSelectModule,
  ],
})
export class ProdutosComponent implements OnInit {
  token: string | undefined;
  dataSource: Produto[] = []; // Dados originais
  filteredDataSource: Produto[] = [];
  totalProdutos = 0;
  pageSize = 12;
  pageIndex = 0;
  loading: boolean = false;
  produtosForm!: FormGroup;

  tagOptions: string[] = [
    'Canadian',
    'CertClean',
    'Chemical Free',
    'Dairy Free',
    'EWG Verified',
    'EcoCert',
    'Fair Trade',
    'Gluten Free',
    'Hypoallergenic',
    'Natural',
    'No Talc',
    'Non-GMO',
    'Organic',
    'Peanut Free Product',
    'Sugar Free',
    'USDA Organic',
    'Vegan',
    'alcohol free',
    'cruelty free',
    'oil free',
    'purpicks',
    'silicone free',
    'water free',
  ];

  categoriaList: string[] = [];

  brandsList: string[] = [
    'almay',
    'alva',
    'anna sui',
    'annabelle',
    'benefit',
    'boosh',
    "burt's bees",
    'butter london',
    "c'est moi",
    'cargo cosmetics',
    'china glaze',
    'clinique',
    'coastal classic creation',
    'colourpop',
    'covergirl',
    'dalish',
    'deciem',
    'dior',
    'dr. hauschka',
    'e.l.f.',
    'essie',
    'fenty',
    'glossier',
    'green people',
    'iman',
    "l'oreal",
    'lotus cosmetics usa',
    "maia's mineral galaxy",
    'marcelle',
    'marienatie',
    'maybelline',
    'milani',
    'mineral fusion',
    'misa',
    'mistura',
    'moov',
    'nudus',
    'nyx',
    'orly',
    'pacifica',
    'penny lane organics',
    'physicians formula',
    'piggy paint',
    'pure anada',
    'rejuva minerals',
    'revlon',
    "sally b's skin yummies",
    'salon perfect',
    'sante',
    'sinful colours',
    'smashbox',
    'stila',
    'suncoat',
    'w3llpeople',
    'wet n wild',
    'zorah',
    'zorah biocosmetiques',
  ];

  tagsControl = new FormControl([]);
  brandsControl = new FormControl([]);
  categoryControl = new FormControl([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private spinner = inject(MatProgressSpinnerModule);

  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private produtoService: GenericService<Produto>,
    private toastr: ToastrService
  ) {
    this.token = this.storage.getData('token');
  }

  ngOnInit() {
    this.carregarProdutos();
    this.construirFormulario();
  }

  onSubmit() {
    
  }

  construirFormulario() {
    this.produtosForm = this.fb.group({
      marca: [''],
      precoInicial: [''],
      precoFinal: [''],
      categoria: [''],
      tags: [''],
    });
  }

  get produtosFiltradosPaginados(): Produto[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredDataSource.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  carregarProdutos() {
    this.loading = true; // Mostra o loading

    this.produtoService
      .getItemsProdutos<Produto[]>(Urlproduto.Obter)
      .subscribe({
        next: (resultado) => {
          this.dataSource = resultado;
          this.filteredDataSource = [...resultado];
          this.totalProdutos = resultado.length;

          this.categoriaList = Array.from(
            new Set(
              this.dataSource.map((item) => item.category).filter((cat) => cat)
            )
          );

          console.log(this.categoriaList);
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

  get produtosPaginados(): Produto[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.dataSource.slice(startIndex, startIndex + this.pageSize);
  }

  paginar(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  limparFiltros() {
    this.produtosForm.reset();
    this.filtrar();
  }

  abrirModal(item: any) {
    if (item.price == '0.0') {
      this.toastr.warning('Produto indissponível!', 'Alerta!');
      return;
    }

    const dialogRef = this.dialog.open(ModalProdutoDetalhesComponent, {
      width: 'auto',
      data: item || {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  filtrar() {
    const filtro = this.produtosForm.value;

    this.filteredDataSource = this.dataSource.filter((produto) => {
      const brand = produto.brand ? produto.brand.toLowerCase() : '';
      const category = produto.category ? produto.category.toLowerCase() : '';
      const tags = produto.tag_list
        ? produto.tag_list.map((tag) => tag.toLowerCase())
        : [];

      return (
        (!filtro.marca || brand.includes(filtro.marca.toLowerCase())) &&
        (!filtro.preco ||
          produto.price.toString().includes(filtro.preco.toString())) &&
        (!filtro.categoria ||
          category.includes(filtro.categoria.toLowerCase())) &&
        (!filtro.tags ||
          tags.some((tag) => tag.includes(filtro.tags.toLowerCase())))
      );
    });

    this.totalProdutos = this.filteredDataSource.length;

    // Verifica se o paginator está definido antes de chamar firstPage()
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}
