import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { EthereumService } from 'src/app/services/ethereum.service';
import { EthereumServiceMock } from 'src/app/mocks/ethereum.service.mock';
import { from } from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [
        { provide: EthereumService, useClass: EthereumServiceMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render admin form', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.container').textContent).toContain('Start new lottery');
  });

  it('no metamask should work correctly', () => {
    component.accounts$ = from([]);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Please turn ');
  });

  it('no contract should work correctly', () => {
    component.address$ = from([]);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).not.toContain('Check status of the lottery');
  });


  it('with contract should work correctly', () => {
    component.address$ = from(["dsddfdfdffdfd"]);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Check status of the lottery');
  });


  it('Pick the winner should work correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.pickTheWinner();
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Check contract');
  });

  it('Update accounts should work correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.updateAccounts();
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Check contract');
  });

  it('Check status should work correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.checkStatus();
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Check contract');
  });

  it('Start new should work correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.startNew();
    fixture.detectChanges();
    expect(compiled.querySelector('.container').textContent).toContain('Check contract');
  });

});
