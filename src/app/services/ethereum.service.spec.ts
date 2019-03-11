import { TestBed, getTestBed } from '@angular/core/testing';

import { EthereumService } from './ethereum.service';
import { WEB3 } from './web3';
import { Web3Mock } from '../mocks/web3.mock';
import { from } from 'rxjs';

describe('EthereumService', () => {
  let service: EthereumService;


  beforeEach(() => TestBed.configureTestingModule({

    providers: [
      { provide: WEB3, useClass: Web3Mock }
    ],
  }));

  beforeEach(async () => {
    var testBed = getTestBed();
    service = testBed.get(EthereumService)
    console.log(service)
  })


  it('should be created', async () => {
    expect(service).toBeTruthy();
  });

  it('should take count', async () => {
    let expected = from ([['dssdsdsd']])

    let res = service.checkStatus();

    console.log(res)
    expect(await service.checkByNumber(1)).toEqual(expected);
  });

  
});
