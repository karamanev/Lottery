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

describe('OtherComponent', () => {
  let component: OtherComponent;
  let fixture: ComponentFixture<OtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherComponent,
         MainComponent,
        AppComponent,
        MainComponent,
        OtherComponent,
        HeaderComponent,
        AdminComponent
      ],  imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
      ],  providers: [
        EthereumService,
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
    expect(component).toBeUndefined();
  });
});
