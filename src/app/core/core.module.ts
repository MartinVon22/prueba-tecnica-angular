import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoaderInterceptorService } from '../shared/interceptors/loader.interceptor'
import { UserService } from './services/user.service'

@NgModule({
  declarations: [],
  imports: [HttpClientModule, CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    UserService
  ]
})
export class CoreModule {}
