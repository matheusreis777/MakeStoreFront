import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  imports: [HeaderComponent]
})
export class ProdutosComponent implements OnInit {
  token: string | undefined;
  
  constructor(private storage: StorageService) {
    this.token = this.storage.getData('token');
  }


  ngOnInit() {
  }

}
