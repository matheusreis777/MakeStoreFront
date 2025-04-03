import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-produto-detalhes',
  templateUrl: './modal-produto-detalhes.component.html',
  styleUrls: ['./modal-produto-detalhes.component.scss'],
  imports: [MatButtonModule, MatDialogModule, CommonModule],
})
export class ModalProdutoDetalhesComponent {

  produto: any;

  constructor(
    public dialogRef: MatDialogRef<ModalProdutoDetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.produto = data;
  }

  ngOnInit() {    
  }

  close() {
    this.dialogRef.close(); 
  }

}
