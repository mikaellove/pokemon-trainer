import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { getUser, removeUser } from 'src/app/utils/storage';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  get username(): any {
    const user: UserModel = getUser();

    if (user) {
      return user.username;
    }
    return null;
  }

  public logout(): void{
    removeUser();
    this.router.navigate(["/"])
  }
}
