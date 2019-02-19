import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { OtherComponent } from './components/other/other.component';
import { EthereumService } from './services/ethereum.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    EthereumService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
