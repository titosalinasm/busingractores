import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from "ngx-spinner";
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerPrincipalComponent } from './components/banner-principal/banner-principal.component';
import { MenuComponent } from './components/menu/menu.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AvanzadaService } from './services/avanzada.service';
import { SimpleService } from './services/simple.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipComponent } from './components/tooltip/tooltip.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    BannerPrincipalComponent,
    MenuComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastNoAnimationModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    NgxSpinnerModule,
    TabsModule.forRoot(),
    NgxPaginationModule,
    PopoverModule.forRoot(),
  ],
  providers: [
    AvanzadaService,
    SimpleService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
 }
