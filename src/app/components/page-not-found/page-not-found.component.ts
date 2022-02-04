import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  UserExistInLocalStorage(): boolean {
    if (localStorage.getItem('user')) return true;
    else return false;
  }

  OnClickBackToLogin(): void {
    this.router.navigate(['/login']);
  }

  OnClickBackToTrainerPage(): void {
    this.router.navigate(['/trainer']);
  }
}
