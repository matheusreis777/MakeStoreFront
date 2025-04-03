import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BlockUIModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'makestore';

  @BlockUI() blockUI!: NgBlockUI;

  startLoading() {
    this.blockUI.start('Carregando...'); 
    setTimeout(() => this.blockUI.stop(), 3000); 
  }

  stopLoading() {
    this.blockUI.stop(); 
  }
}


