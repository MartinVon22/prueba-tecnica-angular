import { Injectable, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  protected clientId = environment.client_id
  private auth2: gapi.auth2.GoogleAuth

  private currentUserSubject: BehaviorSubject<gapi.auth2.GoogleUser | null>

  public currentUser: Observable<gapi.auth2.GoogleUser | null>

  constructor(private _ngZone: NgZone, private route: Router) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId
      })
    })

    this.currentUserSubject = new BehaviorSubject<gapi.auth2.GoogleUser | null>(
      null
    )
    this.currentUser = this.currentUserSubject.asObservable()
  }

  signIn() {
    this.auth2
      .signIn({})
      .then((user) => {
        this.currentUserSubject.next(user)
        this._ngZone.run(() => {
          this.route.navigate(['/home'])
        })
      })
      .catch(() => {
        this.currentUserSubject.next(null)
      })
  }

  public signOut() {
    this.auth2.signOut().then(() => {
      this.currentUserSubject.next(null)
      this.route.navigateByUrl('')
    })
  }

  public get currentUserValue(): gapi.auth2.GoogleUser | null {
    if (!this.currentUserSubject.value) {
      this.currentUserSubject.next(null)
    }
    return this.currentUserSubject.value
  }
}
