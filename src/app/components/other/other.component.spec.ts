import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherComponent } from './other.component';
import { MainComponent } from '../main/main.component';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from '../header/header.component';
import { AdminComponent } from '../admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EthereumService } from 'src/app/services/ethereum.service';
import { ToastrModule } from 'ngx-toastr';
import { EthereumServiceMock } from 'src/app/mocks/ethereum.service.mock';

describe('OtherComponent', () => {
  let component: OtherComponent;
  let fixture: ComponentFixture<OtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtherComponent,
        MainComponent,
        AppComponent,
        MainComponent,
        OtherComponent,
        HeaderComponent,
        AdminComponent
      ], imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
      ], providers: [
        { provide: EthereumService, useClass: EthereumServiceMock }
      ],


    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button check number', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.btn').textContent).toContain('Check number');
  });

  it('checkByNumber should work correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.checkByNumber();
    fixture.detectChanges();
    expect(compiled.querySelector('.numberDiv').textContent).toContain('Entrances for 0:  accountfortesting');
  });

  it('checkCountOfEntrances should work correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.checkCountOfEntrances();
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Check');
  });

  it('checkStatus should work correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.checkStatus();
    fixture.detectChanges();
    expect(compiled.querySelector('.numberDiv').textContent).toContain('Lottery status is: opened');
  });

});
