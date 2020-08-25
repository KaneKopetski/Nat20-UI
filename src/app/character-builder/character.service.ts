import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CharacterTemplateRequest} from './character-request';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characterEndpoint: '/characters';
  private characterEndpointGet: '/characters/get/';
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getCharacters() {
    return this.http.get(this.apiUrl + this.characterEndpoint);
  }

  getCharacterById() {
    return this.http.get(this.apiUrl + '/characters/getCharacter/' + 2);
  }
}
