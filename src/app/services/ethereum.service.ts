import { Injectable, NgZone, Inject } from '@angular/core';
import { Entrance } from '../models/entrance';
import { Observable, BehaviorSubject, bindNodeCallback } from 'rxjs';
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

  private countSubject = new BehaviorSubject(0);
  countOtEntrances$: Observable<number> = this.countSubject.asObservable();


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
    let userAccount = (this.subject.value[0])
    return this.contract
      .methods.enter(entrance.number)
      .send({ from: userAccount, value: this.web3.utils.toWei("0.001", "ether") })
      .then(console.log).catch(err => console.log(err));
  }

  checkByNumber(number: number): string[] {
    console.log(number)
    return this.contract
      .methods.getAddressesByNumber(2)
      .call()
      .then(console.log);
  }

  checkCountOfEntrances() {



    var c = bindNodeCallback(this.contract.methods.getCountOfEntranses().call())()
    .pipe(
      tap(res => console.log(res)),
      map(ent => this.countSubject.next(Number(ent))
    ))

console.log(this.countOtEntrances$)
console.log(this.countSubject)
console.log(c)

}

  pickTheWinner() {
    let userAccount = (this.subject.value[0])
    return this.contract
    .methods.determineWinner()
    .send({ from: userAccount })
    .then(console.log).catch(err => console.log(err));
  }
}
