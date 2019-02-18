import { Component, OnInit, Inject } from '@angular/core';
import { WEB3 } from '../../services/web3';
import Web3 from 'web3';
import { EthereumService } from '../../services/ethereum.service';
import { SearchEntrance } from 'src/app/models/searchEntrance';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  searchEntrance: SearchEntrance;
  countOfEntrances$: Observable<number>;

  constructor(@Inject(WEB3) private web3: Web3,
    private ethereumService: EthereumService) {
    this.searchEntrance = new SearchEntrance(0)
  }

  ngOnInit() {
    this.countOfEntrances$ = this.ethereumService.countOtEntrances$
  }

  checkByNumber() {
    console.log(this.searchEntrance.number)
    this.ethereumService.checkByNumber(this.searchEntrance.number);
  }

  checkCountOfEntrances() {
    console.log('asas')
    this.ethereumService.checkCountOfEntrances();
  }

  pickTheWinner() {
    console.log('asas')
    this.ethereumService.pickTheWinner();
  }
}
