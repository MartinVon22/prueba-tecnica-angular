import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { GoogleService, UserService } from 'src/app/core'
import * as fromApp from '../../core/store/app-state.reducer'
import * as fromLoaderAction from '../../core/store/actions/loader.actions'
import { User } from 'src/app/core/models/user.model'
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent
} from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort, Sort } from '@angular/material/sort'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { environment } from 'src/environments/environment'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from './dialog/dialog.component'
import { MatMenuTrigger } from '@angular/material/menu'
import { FormControl } from '@angular/forms'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  protected clientId = environment.client_id
  displayedColumns: string[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email'
  ]

  pagination = { page: 1, per_page: 0, total: 0, total_pages: 0 }
  users: User[] = []
  dataSource: MatTableDataSource<User>
  pageEvent: PageEvent
  userLoggedIn: boolean = false

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger

  userUpdate = { id: null, name: '' }

  jobName = new FormControl('')
  name = new FormControl('')

  horizontalPosition: MatSnackBarHorizontalPosition = 'end'
  verticalPosition: MatSnackBarVerticalPosition = 'top'

  constructor(
    private userService: UserService,
    private store: Store<fromApp.AppState>,
    public _MatPaginatorIntl: MatPaginatorIntl,
    private _liveAnnouncer: LiveAnnouncer,
    private googleService: GoogleService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {
    this._MatPaginatorIntl.itemsPerPageLabel = 'Items por página'
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit() {
    if (this.googleService.currentUserValue != null) {
      this.store.dispatch(new fromLoaderAction.showLoaderAction(true))
      this.userService.getUsers(this.pagination).subscribe((res: any) => {
        this.pagination = {
          page: res.page,
          per_page: res.per_page,
          total: res.total,
          total_pages: res.total_pages
        }
        this.users = res.data
        this.dataSource = new MatTableDataSource<User>(this.users)
        this.dataSource.sort = this.sort
        this.ref.detectChanges()
        this.store.dispatch(new fromLoaderAction.showLoaderAction(false))
      })
    } else {
      this.route.navigate([''])
    }
  }

  getServerData(event: PageEvent) {
    this.store.dispatch(new fromLoaderAction.showLoaderAction(true))
    this.pagination.page = event.pageIndex + 1
    this.userService.getUsers(this.pagination).subscribe((res: any) => {
      this.pagination = {
        page: res.page,
        per_page: res.per_page,
        total: res.total,
        total_pages: res.total_pages
      }
      this.users = res.data
      this.dataSource = new MatTableDataSource<User>(this.users)
      this.dataSource.sort = this.sort
      this.store.dispatch(new fromLoaderAction.showLoaderAction(false))
    })
    return event
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting cleared')
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { restoreFocus: false })

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus())
  }

  goToUpdateUser(row: any) {
    this.userUpdate.id = row.id
    this.userUpdate.name = row.first_name
  }

  updateUser() {
    this.userService
      .actualizarUsuario({
        name: this.name.value,
        job: this.jobName.value,
        id: this.userUpdate.id
      })
      .subscribe((res) => {
        console.log(res)
        if (res) {
          this.openSnackBar('El Usuario se ha actualizado con éxito')
          this.userUpdate.id = null
          this.userUpdate.name = ''
        }
      })
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }
}
