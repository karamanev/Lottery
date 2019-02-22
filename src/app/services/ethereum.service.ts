import { Injectable, Inject } from '@angular/core';
import { Entrance } from '../models/entrance';
import { Observable, BehaviorSubject, bindNodeCallback, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WEB3 } from './web3';
import Web3 from 'web3';
import Abi from './Abi';
import byteCode from './Bytecode';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  private subject = new BehaviorSubject(['']);
  accounts$: Observable<string[]> = this.subject.asObservable();

  private addressSubject = new BehaviorSubject('');
  address$: Observable<string> = this.addressSubject.asObservable();

  contract: any;
  countOfEntrances$: Observable<number> = new Observable<number>();

  constructor(@Inject(WEB3) private web3: Web3) {
  }

  getAccounts(): Observable<string[]> {
    bindNodeCallback(this.web3.eth.getAccounts)()
      .pipe(
        map((accounts: string[]) => this.subject.next(accounts)),
      ).subscribe()
    return this.accounts$
  }

  enter(entrance: Entrance): void {
    from(this.contract
      .methods.enter(entrance.number)
      .send({ from: entrance.key, value: this.web3.utils.toWei("0.001", "ether") }))
      .pipe(
        tap(() => console.log("Succesfully entered #" + entrance.number))
      ).subscribe()
  }

  checkByNumber(number: number): Observable<string[]> {
    return from(this.contract.methods.getAddressesByNumber(number).call())
      .pipe(
        map(res => res[0]),
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
        map(res => res[0]),
        map(res => Number(res)),
        tap(res => console.log(res))
      )
  }

  checkStatus(): Observable<Status> {
    return from(this.contract.methods.checkStatusAndWinner().call())
      .pipe(
        map(function (res: Status) {
          return { status: (Number(res.status) === 0 ? 'opened' : 'closed'), number: Number(res.number) }
        }),
      )
  }

  async newLottery() {
    let userAccount = (this.subject.value[0])
    const newContract = await new this.web3.eth.Contract(Abi)
      .deploy({
        data: byteCode,
      })
      .send({ from: userAccount, gas: 1000000 });
    console.log("Your new lottery is opened at address: " + newContract.options.address)

    this.contract = new this.web3.eth.Contract(Abi, newContract.options.address);
    this.addressSubject.next(newContract.options.address)
    this.addressSubject.subscribe();

    console.log(this.addressSubject)

  }
}