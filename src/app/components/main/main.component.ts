import { Component, OnInit, Inject } from '@angular/core';
import { Entrance } from 'src/app/models/entrance';
import { EthereumService } from '../../services/ethereum.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  accounts$: Observable<string[]>;
  entrance: Entrance;
  hasAccount: boolean;
  address$: Observable<string>;
  timer: any;

  constructor(
    private ethereumService: EthereumService) {
    this.entrance = new Entrance('', 0);
  }

  ngOnInit() {
    this.accounts$ = this.ethereumService.getAccounts();
    this.address$ = this.ethereumService.address$;

    this.timer = setInterval(() => {
      this.updateAccounts()
    }, 3000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  updateAccounts(): any {
    this.accounts$ = this.ethereumService.getAccounts();
  }

  enter() {
    this.ethereumService.enter(this.entrance);
  }
}