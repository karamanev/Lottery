import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { BrowserModule } from '@angular/platform-browser';

import { EthereumServiceMock } from 'src/app/mocks/ethereum.service.mock';
import { EthereumService } from 'src/app/services/ethereum.service';
import { OtherComponent } from '../other/other.component';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { tick } from '@angular/core/src/render3';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent,
        OtherComponent
      ], imports: [
        BrowserModule,
        FormsModule
      ], providers: [
        { provide: EthereumService, useClass: EthereumServiceMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render enter form', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.container').textContent).toContain('Choose your public');
  });

  it('no metamask should work correctly', () => {
    component.accounts$ = from([]);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Please turn ');
  });

  it('Update accounts should work correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.updateAccounts();
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Submit');
  });

  it('Detect changes should work correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.enter();
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Submit');
  });


});
