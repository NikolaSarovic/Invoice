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
import { FaktureCreateDialogComponent } from './fakture/components/fakture-create-dialog/fakture-create-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FakturaOdredjenaComponent } from './fakture/components/faktura-odredjena/faktura-odredjena.component';
import { ArtikalUpdateComponent } from './fakture/components/artikal-update/artikal-update.component';
import { ArtikalCreateComponent } from './fakture/components/artikal-create/artikal-create.component';
import { FakturaUpdateComponent } from './fakture/components/faktura-update/faktura-update.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FaktureComponent,
    FakturaOdredjenaComponent,
    
    
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    FaktureCreateDialogComponent,
    MatSnackBarModule,
    ArtikalUpdateComponent,
    ArtikalCreateComponent,
    FakturaUpdateComponent,
    
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
