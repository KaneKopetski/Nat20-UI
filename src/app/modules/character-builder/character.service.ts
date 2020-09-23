import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CharacterTemplateModel} from './model/character-template-model';
import {Observable} from 'rxjs';
import {CharacterPageModel} from './model/character-page-model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly apiUrl;
  private characterById = '/characters/getCharacter/';
  private characterPage = '/characters/getAll?page=';
  private saveCharacter = '/characters/save';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getCharacterById(id: number): Observable<CharacterTemplateModel> {
    return this.http.get<CharacterTemplateModel>(this.apiUrl + this.characterById + id);
  }

  getCharacters(pageNumber: number, pageSize: number): Observable<CharacterPageModel> {
    return this.http.get<CharacterPageModel>(this.apiUrl + this.characterPage + pageNumber + '&size=' + pageSize);
  }

}
