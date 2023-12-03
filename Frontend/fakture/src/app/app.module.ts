import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import {HttpClientModule}  from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FaktureComponent } from './fakture/components/fakture/fakture.component';
import { AuthService } from './auth/services/auth.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FakturaOdredjenaComponent } from './fakture/components/faktura-odredjena/faktura-odredjena.component';
import { ArtikalUpdateComponent } from './fakture/components/artikal-update/artikal-update.component';
import { ArtikalCreateComponent } from './fakture/components/artikal-create/artikal-create.component';
import { FakturaUpdateComponent } from './fakture/components/faktura-update/faktura-update.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArtikalDeleteComponent } from './fakture/components/artikal-delete/artikal-delete.component';
import { FakturaDeleteComponent } from './fakture/components/faktura-delete/faktura-delete.component';
import { FaktureCreateComponent } from './fakture/components/fakture-create/fakture-create.component';



@NgModule({
  declarations: [
    AppComponent,
    FaktureComponent,
    FakturaOdredjenaComponent,
    HeaderComponent,
    FooterComponent,
    ArtikalDeleteComponent,
    FakturaDeleteComponent,
    
    
    
    
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    FaktureCreateComponent,
    MatSnackBarModule,
    ArtikalUpdateComponent,
    ArtikalCreateComponent,
    FakturaUpdateComponent,
    LoginComponent,
    RegisterComponent,
    BrowserAnimationsModule,
    
    
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
