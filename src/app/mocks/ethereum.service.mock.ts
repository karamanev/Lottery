import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Entrance } from '../models/entrance';
import { Status } from '../models/status';

@Injectable()
export class EthereumServiceMock {

    accounts$: Observable<string[]> = from([['accountfortesting']]);

    address$: Observable<string> = from(['addressfortesting']);

    constructor() { }

    
    getAccounts(): Observable<string[]> {
        return from([['accountfortesting']])
    }

    enter(entrance: Entrance): void { }

    checkByNumber(number: number): Observable<string[]> {
        return from([['accountfortesting', 'accountfortesting2']])
    }

    checkCountOfEntrances(): Observable<number> {
        return from([0])
    }

    pickTheWinner(): void {
    }

    checkStatus(): Observable<Status> {
        return from([{status: 'opened', number: 2}])
    }

    async newLottery() {
    }

}