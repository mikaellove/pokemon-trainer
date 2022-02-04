import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { UserModel } from '../../models/user-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private readonly httpService: HttpClientService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpService.FetchUsers();
  }

  OnClick(input: string): void {
    if (!input) return;

    this.UserExist(input);
    this.router.navigate(['/trainer']);
  }

  UserExist(username: string): void {
    const users: UserModel[] = this.httpService.GetUsers();

    for (let index = 0; index < users.length; index++) {
      const element = users[index];

      if (element.username === username) {
        localStorage.setItem('user', JSON.stringify(element));
        console.log('user exists');
        // TODO: Navigate to Trainer Page
        return;
      }
    }

    // User dont exist, add user to database and localstorage
    this.httpService.AddUser(username, (addedUser: UserModel) => {
      localStorage.setItem('user', JSON.stringify(addedUser));
    });
    console.log('user dont exists post to database');
  }
}
