import { TestBed, getTestBed } from '@angular/core/testing';

import { EthereumService } from './ethereum.service';
import { WEB3 } from './web3';
import { Web3Mock } from '../mocks/web3.mock';
import { from } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import Abi from './Abi';
import Web3 from 'web3';
//    @Inject(WEB3) private web3: Web3,

describe('EthereumService', () => {
  let service: EthereumService;


  beforeEach(() => {TestBed.configureTestingModule({

    providers: [
      { provide: WEB3, useValue: Web3Mock,
      Web3 }
    ], imports: [
      ToastrModule.forRoot(),
    ],
  })
});

  beforeEach( () => {
    var testBed = getTestBed();
    service = testBed.get(EthereumService)
  })

  it('should be created', async () => {
    expect(service).toBeTruthy();
  });

  


});
