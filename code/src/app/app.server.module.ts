import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppCommonModule } from './app.common.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    ServerModule,
    NoopAnimationsModule,
    AppCommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
