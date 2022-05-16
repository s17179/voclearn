import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VoclearnHeaderModule } from '@voclearn/voclearn/header';
import { VoclearnSharedCoreModule } from '@voclearn/voclearn/shared/core';

@NgModule({
  declarations: [AppComponent],
  imports: [VoclearnSharedCoreModule, AppRoutingModule, VoclearnHeaderModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
