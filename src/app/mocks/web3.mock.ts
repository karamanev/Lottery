import { InjectionToken } from '@angular/core';
import Web3 from 'web3';

export const Web3Mock = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => {
      const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
      return new Web3(provider);
    
  }
});