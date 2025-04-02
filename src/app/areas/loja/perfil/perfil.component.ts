import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [HeaderComponent]
})
export class PerfilComponent implements OnInit {
  token: string | undefined;
  
  constructor(private storage: StorageService) {
    this.token = this.storage.getData('token');
  }


  ngOnInit() {
  }

}
