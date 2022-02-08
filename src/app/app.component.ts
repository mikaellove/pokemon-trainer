import { Component, OnInit } from '@angular/core';
import { HttpClientService } from './services/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly http: HttpClientService) {}

  ngOnInit(): void {
    this.http.FetchPokemonsAddsToSessionStorage();
  }
}
