import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { GenericService } from '../../../shared/services/generic.service';
import { Produto } from '../../../shared/models/produto.model';
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
import { UrlProduto } from '../../../shared/Util/url/produto/url-produto';

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

  tagsControl = new FormControl<string[]>([], { nonNullable: true });
  brandsControl = new FormControl<string[]>([], { nonNullable: true });
  categoryControl = new FormControl<string[]>([], { nonNullable: true });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
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

  onSubmit() {}

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
    this.loading = true;

    this.produtoService
      .getItemsProdutos<Produto[]>(UrlProduto.Obter)
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
   this.construirFormulario()
  }

  abrirModal(item: any) {
    if (item.price == '0.0' || item.product_colors.length == 0) {
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
    const marcasSelecionadas = this.brandsControl.value || [];
    const categoriasSelecionadas = this.categoryControl.value || [];
    const tagsSelecionadas = this.tagsControl.value || [];
  
    const precoInicialRaw = this.produtosForm.get('precoInicial')?.value || '';
    const precoFinalRaw = this.produtosForm.get('precoFinal')?.value || '';
  
    const precoInicial =
      parseFloat(precoInicialRaw.replace(/[^\d.-]+/g, '').replace(',', '.')) || 0;
  
    const precoFinal =
      parseFloat(precoFinalRaw.replace(/[^\d.-]+/g, '').replace(',', '.')) ||
      Number.MAX_SAFE_INTEGER;
  
    const filtrosVazios =
      marcasSelecionadas.length === 0 &&
      categoriasSelecionadas.length === 0 &&
      tagsSelecionadas.length === 0 &&
      !precoInicialRaw &&
      !precoFinalRaw;
  
    // Se nenhum filtro for aplicado, retorna a lista completa
    if (filtrosVazios) {
      this.filteredDataSource = [...this.dataSource];
    } else {
      this.filteredDataSource = this.dataSource.filter((produto) => {
        const preco = parseFloat(produto.price || '0');
        const brand = (produto.brand || '').toLowerCase();
        const categoria = (produto.category || '').toLowerCase();
        const tagsProduto =
          produto.tag_list?.map((tag) => tag.toLowerCase()) || [];
  
        const marcaValida =
          marcasSelecionadas.length === 0 ||
          marcasSelecionadas.includes(brand);
  
        const categoriaValida =
          categoriasSelecionadas.length === 0 ||
          categoriasSelecionadas.includes(categoria);
  
        const tagsValidas =
          tagsSelecionadas.length === 0 ||
          tagsSelecionadas.some((tag) =>
            tagsProduto.includes(tag.toLowerCase())
          );
  
        const precoValido = preco >= precoInicial && preco <= precoFinal;
  
        return marcaValida && categoriaValida && tagsValidas && precoValido;
      });
    }
  
    this.totalProdutos = this.filteredDataSource.length;
  
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
  
}
