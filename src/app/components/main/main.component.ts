import { Component, OnInit, Inject } from '@angular/core';
import { Entrance } from 'src/app/models/entrance';
import { EthereumService } from '../../services/ethereum.service';
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  accounts$: Observable<string[]>;
  entrance: Entrance;
  hasAccount: boolean

  constructor(
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