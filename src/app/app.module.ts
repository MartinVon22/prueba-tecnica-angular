import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { SharedModule } from './shared/shared.module'
import { StoreModule } from '@ngrx/store'
import { CoreModule } from './core'
import { loaderReducer } from './core/store/reducers/loader.reducer'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatTableModule } from '@angular/material/table'
import {
  MatPaginatorIntl,
  MatPaginatorModule
} from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDialogModule } from '@angular/material/dialog'
import { DialogComponent } from './components/home/dialog/dialog.component'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [AppComponent, LoginComponent, DialogComponent, HomeComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature({ name: 'loader', reducer: loaderReducer }),
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [MatPaginatorIntl],
  bootstrap: [AppComponent]
})
export class AppModule {}
