import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [HeaderComponent]
})
export class DashboardComponent implements OnInit {
  token: string | undefined;
  constructor(
    private storage: StorageService
  ) {
    this.token = this.storage.getData('token');
   }

  ngOnInit() {

  }

}
