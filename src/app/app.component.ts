import { Component } from '@angular/core';
import { LoadingService } from './service/loadingService/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public _loadingService: LoadingService) {}
}
