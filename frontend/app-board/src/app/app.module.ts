import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule,MatOptionModule,MatMenuModule,MatListModule,MatFormFieldModule,MatButtonModule,MatSlideToggleModule, MatIconModule, MatCardModule,MatGridListModule, MatToolbarModule,MatSidenavModule} from '@angular/material';
import { CardContainerComponent } from './card-container/card-container.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    CardContainerComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
