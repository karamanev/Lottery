import { Component, OnInit } from '@angular/core';
import { EthereumService } from '../../services/ethereum.service';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  status$: Observable<Status>;
  address$: Observable<string>;
  accounts$: Observable<string[]>;
  timer: any;

  constructor(private ethereumService: EthereumService) { }

  ngOnInit() {
    this.address$ = this.ethereumService.address$;
    this.accounts$ = this.ethereumService.getAccounts();

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

  pickTheWinner(
  ) {
    this.ethereumService.pickTheWinner();
  }

  checkStatus() {
    this.status$ = this.ethereumService.checkStatus();
  }

  startNew() {
    this.ethereumService.newLottery();
  }

}

