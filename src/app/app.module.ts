import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyDatePickerModule } from 'mydatepicker';
import { DateComponetComponent } from './date-componet/date-componet.component';

@NgModule({
  declarations: [
    AppComponent,
    DateComponetComponent,
  ],
  imports: [
    BrowserModule,
    MyDatePickerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
