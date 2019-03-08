import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { AppComponent } from 'src/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OtherComponent } from '../other/other.component';
import { HeaderComponent } from '../header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AdminComponent } from '../admin/admin.component';
import { EthereumService } from 'src/app/services/ethereum.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent,
        AppComponent,
        MainComponent,
        OtherComponent,
        HeaderComponent,
        AdminComponent
      ],  imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
      ],  providers: [
   //     EthereumService,
      
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component)
    expect(component).toBeTruthy();
  });
});
