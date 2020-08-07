import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characterEndpoint: '/characters';
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getCharacters() {
    console.log("test");
    return this.http.get(this.apiUrl + this.characterEndpoint);
  }
}
