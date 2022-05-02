import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  catchError,
  finalize,
  Observable,
  Subscription,
  tap,
  throwError
} from 'rxjs'

import { LoaderService } from '../services/loader.service'
import * as fromApp from '../../core/store/app-state.reducer'

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  showScreenLoad: boolean

  loaderState: Observable<{
    showLoader: boolean
  }>
  loaderSubscription: Subscription

  statusSolicitud: boolean
  constructor(
    private loaderService: LoaderService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderState = this.store.select('loader')
    this.loaderSubscription = this.loaderState.subscribe((loaderState) => {
      if (loaderState.showLoader) {
        this.showLoader()
      }
    })

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.onEnd()
        }
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {
        return throwError(() => {
          this.onEnd()
          new Error(error.message)
        })
      })
    )
  }

  private onEnd(): void {
    this.hideLoader()
  }

  private showLoader(): void {
    this.loaderService.show()
  }

  private hideLoader(): void {
    this.loaderService.hide()
  }
}
