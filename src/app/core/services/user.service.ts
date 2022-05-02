import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  protected urlEndPoint = environment.apiUrlEndpoint

  getUsers(pagination: any): Observable<HttpResponse<User[]>> {
    const { page } = pagination
    return this.http.get<any>(`${this.urlEndPoint}/users?page=${page}`).pipe()
  }

  crearUsuario(payload: any) {
    const { name, job } = payload
    return this.http
      .post<any>(`${this.urlEndPoint}/users`, { name, job })
      .pipe()
  }

  actualizarUsuario(payload: any) {
    const { name, job, id } = payload
    return this.http
      .patch<any>(`${this.urlEndPoint}/users/${id}`, { name, job })
      .pipe()
  }
}
