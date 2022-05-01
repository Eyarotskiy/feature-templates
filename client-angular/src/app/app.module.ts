import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutInnerComponent } from './components/about/about-inner/about-inner.component';
import { AboutRoutingModule } from 'src/app/components/about/about-routing.module';
import { LoginComponent } from './components/home/login/login.component';
import { ApiService } from 'src/app/services/api/api.service';
import { DataService } from 'src/app/services/data/data.service';
import { AuthInterceptor } from 'src/app/http-interceptors/auth-interceptor';
import { CrudOperationsComponent } from './components/home/crud-operations/crud-operations.component';
import { UsersComponent } from './components/home/crud-operations/users/users.component';
import { MenuComponent } from './components/home/crud-operations/menu/menu.component';
import { WebSocketService } from 'src/app/services/web-socket/web-socket.service';

const httpInterceptor = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];

// const config: SocketIoConfig = {url: 'http://localhost:8000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    AboutInnerComponent,
    LoginComponent,
    CrudOperationsComponent,
    UsersComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AboutRoutingModule,
    AppRoutingModule,
  ],
  providers: [
    httpInterceptor,
    ApiService,
    DataService,
    WebSocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
