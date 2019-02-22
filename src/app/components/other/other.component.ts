import { Component, OnInit } from '@angular/core';
import { EthereumService } from '../../services/ethereum.service';
import { SearchEntrance } from 'src/app/models/searchEntrance';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  searchEntrance: SearchEntrance;
  countOfEntrances$: Observable<number>;
  entrancesByNumber$: Observable<string[]>;
  status$: Observable<Status>;
  opened$: Observable<string>;
  searchedNumber: number;
  
  constructor(private ethereumService: EthereumService) { this.searchEntrance = new SearchEntrance(0) }

  ngOnInit() { }

  checkByNumber() {
    this.searchedNumber = this.searchEntrance.number;
    this.entrancesByNumber$ = this.ethereumService.checkByNumber(this.searchEntrance.number);
  }

  checkCountOfEntrances() {
    this.countOfEntrances$ = this.ethereumService.checkCountOfEntrances();
  }

  checkStatus() {
    this.status$ = this.ethereumService.checkStatus()
  }
}

