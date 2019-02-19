import { Injectable, NgZone, Inject } from '@angular/core';
import { Entrance } from '../models/entrance';
import { Observable, BehaviorSubject, bindNodeCallback, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WEB3 } from './web3';
import Web3 from 'web3';
import Abi from './Abi';

@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  private subject = new BehaviorSubject(['']);
  accounts$: Observable<string[]> = this.subject.asObservable();
  address: string;
  contract: any;
  countOfEntrances$: Observable<number> = new Observable<number>();

  constructor(@Inject(WEB3) private web3: Web3) {
    this.address = '0xe768aaab1adb267f5dc117ccc982ec59396502cf';
    this.contract = new this.web3.eth.Contract(Abi, this.address);
  }

  getAccounts(): Observable<string[]> {
    bindNodeCallback(this.web3.eth.getAccounts)()
      .pipe(
        map((accounts: string[]) => this.subject.next(accounts)),
      ).subscribe()
    return this.accounts$
  }

  enter(entrance: Entrance) {
    from(this.contract
      .methods.enter(entrance.number)
      .send({ from: entrance.key, value: this.web3.utils.toWei("0.001", "ether") }))
      .pipe(
        tap(res => console.log(res))
      ).subscribe()

  }

  //TODO Your entrance was received. You can see more about the transaction here.  

  checkByNumber(number: number): Observable<string[]> {
    console.log(number)
    return from(this.contract.methods.getAddressesByNumber(number).call())
      .pipe(
        map(res => res[0]),
        tap(res => console.log(res))
      )
  }

  checkCountOfEntrances(): Observable<number> {
    return from(this.contract.methods.getCountOfEntranses().call())
      .pipe(
        map(res => res[0])
      )
  }

  pickTheWinner(): Observable<number> {
    let userAccount = (this.subject.value[0])

    return from(this.contract
      .methods.determineWinner()
      .send({ from: userAccount }))
      .pipe(
        map (res => res[0]),
        map(res => Number(res)),
        tap(res => console.log(res))
      )

  }
}