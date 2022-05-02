import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromApp from '../../core/store/app-state.reducer'
import * as fromLoaderAction from '../../core/store/actions/loader.actions'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { GoogleService, UserService } from 'src/app/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private userService: UserService,
    private googleService: GoogleService,
    private route: Router
  ) {}

  ngOnInit() {}

  signIn() {
    this.googleService.signIn()
  }
}
