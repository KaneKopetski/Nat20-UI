import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CharacterClass} from '../model/character-class/character-class';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterClassService {

  private readonly apiUrl: string;
  private contextPath = '/characterClass';
  private getAllCharactersEndPoint = '/getAll';
  private getCharacterByIdEndPoint = '/getById/';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  public getCharacterClasses(): Observable<Array<CharacterClass>> {
    return this.http.get<Array<CharacterClass>>(this.apiUrl + this.contextPath + this.getAllCharactersEndPoint);
  }

  public getCharacterClassById(id: number): Observable<CharacterClass> {
    return this.http.get<CharacterClass>(this.apiUrl + this.contextPath + this.getCharacterByIdEndPoint + id);
  }

}
