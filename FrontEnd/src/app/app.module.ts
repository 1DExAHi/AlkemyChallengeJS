import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OperationsAdminComponent } from './OperationsAdmin/operations-admin.component';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginMainComponent } from './login/login-main/login-main.component';
import { MainComponent } from './main/main.component';
import { MessageBoxComponent } from './message-box/message-box.component';

import { MessageBoxService } from './Services/MessageBox.service';
import { UserService } from './Services/Users.service';
import { OperationsService } from './Services/Operations.service';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { DoughnutChartArea } from './doughnut-chart-area/doughnut-chart-area.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OperationsAdminComponent,
    LoginMainComponent,
    MainComponent,
    MessageBoxComponent,
    OperationsListComponent,
    DoughnutChartArea
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MessageBoxService, OperationsService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
