import { Injectable, Inject } from '@angular/core';
import { Entrance } from '../models/entrance';
import { Observable, BehaviorSubject, bindNodeCallback, from, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WEB3 } from './web3';
import Web3 from 'web3';
import Abi from './Abi';
import byteCode from './Bytecode';
import { Status } from '../models/status';
import { ToastrService } from 'ngx-toastr';

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
  creator: string;
  opened: boolean = true;

  constructor(
    @Inject(WEB3) private web3: Web3,
    private toastr: ToastrService) { }

  getAccounts(): Observable<string[]> {
    try {
      bindNodeCallback(this.web3.eth.getAccounts)()
        .pipe(
          map((accounts: string[]) => this.subject.next(accounts)),
        ).subscribe(
          () => { },
          err => this.toastr.error("There is a problem with getting the accounts. Please try again.")
        );
      return this.accounts$;
    }
    catch{
      throwError("Error with metamask")
    }
  }

  enter(entrance: Entrance): void {
    var num = entrance.number;

    if(this.opened === false){
      this.toastr.error("The lottery is closed!")
      return;
    }

    from(this.contract
      .methods.enter(entrance.number)
      .send({ from: this.subject.value[0], value: this.web3.utils.toWei("0.001", "ether") }))
      .pipe(
        tap(() => {
          console.log("Successfully entered #" + num);
          this.toastr.success("You have successfully entered #" + num)
        }),
      ).subscribe(
        () => { },
        err => {
          this.toastr.error("There is a problem with your entrance. Please try again.")
        })
  }

  checkByNumber(number: number): Observable<string[]> {
    return from(this.contract.methods.getAddressesByNumber(number).call())
      .pipe(
        map(res => res[0]),
      );
  }

  checkCountOfEntrances(): Observable<number> {
    return from(this.contract.methods.getCountOfEntranses().call())
      .pipe(
        map(res => res[0])
      );
  }

  pickTheWinner(): void {
    let userAccount = (this.subject.value[0]);

    if (this.creator != userAccount) {
      this.toastr.error("You are not the creator of this contract!")
      return;
    }

    from(this.contract
      .methods.determineWinner()
      .send({ from: userAccount })
      .on('receipt', () => {
        this.toastr.success("The lottery " + this.addressSubject.value + " is closed!");
        console.log("The lottery is closed!");
        this.opened = false;
      })
    ).subscribe(
      () => { },
      err => {
        this.toastr.error("There is a problem with picking the winner. Please try again.")
      })
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
    try {
      let userAccount = (this.subject.value[0])
      const newContract = await new this.web3.eth.Contract(Abi)
        .deploy({
          data: byteCode,
        })
        .send({ from: userAccount, gas: 1000000 });
      console.log("Your new lottery is opened at address: " + newContract.options.address)
      this.toastr.success("Your new lottery is ready!");

      this.contract = new this.web3.eth.Contract(Abi, newContract.options.address);
      this.addressSubject.next(newContract.options.address);
      this.creator = userAccount;
      this.opened = true;
    }
    catch{
      (err => {
        this.toastr.error("There is a problem with the new lottery. Please try again.")
      })
    }
  }
}