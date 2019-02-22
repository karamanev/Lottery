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
  opened$: Observable<string>;
  address$: Observable<string>;

  constructor(private ethereumService: EthereumService) { }

  ngOnInit() { 
    this.address$ = this.ethereumService.address$
    console.log(this.address$)
  }

  pickTheWinner(
  ) {
    this.ethereumService.pickTheWinner();
  }

  checkStatus() {
    this.status$ = this.ethereumService.checkStatus()
  }

  startNew(){
    this.ethereumService.newLottery();
  }

}

