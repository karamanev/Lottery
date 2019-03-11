import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { OtherComponent } from './components/other/other.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EthereumService } from './services/ethereum.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainComponent,
        OtherComponent,
        HeaderComponent,
        AdminComponent
      ], imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        EthereumService
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'lottery'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('lottery');
  });

   
});
