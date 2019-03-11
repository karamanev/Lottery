import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { BrowserModule } from '@angular/platform-browser';

import { EthereumServiceMock } from 'src/app/mocks/ethereum.service.mock';
import { EthereumService } from 'src/app/services/ethereum.service';
import { OtherComponent } from '../other/other.component';
import { FormsModule } from '@angular/forms';

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
});
