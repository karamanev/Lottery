import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EthereumService } from './services/ethereum.service';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { OtherComponent } from './components/other/other.component';
import { AdminComponent } from './components/admin/admin.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OtherComponent,
    HeaderComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    EthereumService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
