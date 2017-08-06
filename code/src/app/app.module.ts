import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppCommonModule } from './app.common.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppCommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
