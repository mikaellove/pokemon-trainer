import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { UserModel } from '../models/user-model';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private readonly httpService: HttpClientService) {}

  ngOnInit(): void {
    this.httpService.FetchUsers();
  }

  OnClick(input: string): void {
    if (input === '') return;
    this.UserExist(input);
  }

  UserExist(username: string): void {
    const users: UserModel[] = this.httpService.GetUsers();

    for (let index = 0; index < users.length; index++) {
      const element = users[index];

      if (element.username === username) {
        // set user and it's id to localstorage and go on to trainer page
        console.log('user exists');
        return;
      }
    }

    // USer dont Exist post user to database
    console.log('user dont exists post to database');
  }
}
