import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppCommonModule} from './app.common.module';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppCommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
