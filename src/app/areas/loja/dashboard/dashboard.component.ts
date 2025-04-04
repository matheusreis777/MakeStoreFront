import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: []
})
export class DashboardComponent implements OnInit {
  token: string | undefined;
  email: string | undefined;
  constructor(
    private storage: StorageService
  ) {
    this.token = this.storage.getData('token');
    this.email = this.storage.getData('email');

   }

  ngOnInit() {
    console.log(this.email);
  }

}
