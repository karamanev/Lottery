import { Component, OnInit, Inject } from '@angular/core';
import { WEB3 } from '../../services/web3';
import Web3 from 'web3';
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

  constructor(
    @Inject(WEB3) private web3: Web3,
    private ethereumService: EthereumService) {
    this.entrance = new Entrance('', 0);
  }

  ngOnInit() {
    this.accounts$ = this.ethereumService.getAccounts();
  }

  enter() {
    this.ethereumService.enter(this.entrance);
  }
}