import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoaderComponent } from './components/loader/loader.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { GoogleService } from '../core'

@NgModule({
  declarations: [LoaderComponent, ToolbarComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    LoaderComponent,
    ToolbarComponent,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule {}
