import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { userInfoInterceptor } from './core/interceptors/user-info.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { Chart, registerables } from 'chart.js';
import { CoreModule } from './core/core.module';

Chart.register(...registerables);

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, AuthLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([])),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
