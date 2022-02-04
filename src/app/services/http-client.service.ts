import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../models/user-model';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private readonly http: HttpClient) {}
  private users: UserModel[] = [];

  public FetchUsers(): void {
    this.http
      .get<UserModel[]>('https://assignments-api.herokuapp.com/trainers')
      .subscribe({
        next: (data: UserModel[]) => {
          this.users = data;
        },
      });
  }

  GetUsers(): UserModel[] {
    return this.users;
  }
}
