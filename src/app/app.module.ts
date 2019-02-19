import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { OtherComponent } from './components/other/other.component';
import { EthereumService } from './services/ethereum.service';
import { FormsModule } from '@angular/forms';
import { NewLotteryComponent } from './components/new-lottery/new-lottery.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OtherComponent,
    NewLotteryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    EthereumService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
