import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss'],
  imports: [],
})
export class ListaComprasComponent implements OnInit {
  token: string | undefined;
  
  constructor(private storage: StorageService) {
    this.token = this.storage.getData('token');
  }

  ngOnInit() {}
}
