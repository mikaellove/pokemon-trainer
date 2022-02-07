import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { getUser } from 'src/app/utils/storage';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get username(): any {
    const user: UserModel = getUser();

    if (user) {
      return user.username;
    }
    return null;
  }
}
