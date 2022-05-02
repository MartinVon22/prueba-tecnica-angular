import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/core'
import * as fromApp from '../../../core/store/app-state.reducer'
import * as fromLoaderAction from '../../../core/store/actions/loader.actions'
import { Store } from '@ngrx/store'
import { FormControl } from '@angular/forms'

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  userCreated = false
  jobName = new FormControl('')
  name = new FormControl('')

  horizontalPosition: MatSnackBarHorizontalPosition = 'end'
  verticalPosition: MatSnackBarVerticalPosition = 'top'

  constructor(
    private userService: UserService,
    private store: Store<fromApp.AppState>,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {}

  crearUsuario() {
    if (this.name.valid && this.jobName.valid) {
      this.store.dispatch(new fromLoaderAction.showLoaderAction(true))

      this.userService
        .crearUsuario({ name: this.name.value, job: this.jobName.value })
        .subscribe((res) => {
          console.log(res)
          if (res) {
            this.openSnackBar('El Usuario se ha creado exitosamente')
            this.dialogRef.close()
          }
        })
    }
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }
}
