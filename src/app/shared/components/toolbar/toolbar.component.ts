import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { GoogleService } from 'src/app/core'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: gapi.auth2.GoogleUser | null = null

  constructor(
    private googleService: GoogleService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.googleService.currentUser.subscribe((user) => {
      this.user = user
      this.ref.detectChanges()
    })
  }
}
