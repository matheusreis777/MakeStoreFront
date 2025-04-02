import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss'],
  imports: [HeaderComponent],
})
export class ListaComprasComponent implements OnInit {
  token: string | undefined;
  
  constructor(private storage: StorageService) {
    this.token = this.storage.getData('token');
  }

  ngOnInit() {}
}
