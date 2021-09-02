import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CharacterClass} from '../../model/character-class/character-class';
import {environment} from '../../../../../environments/environment';
import {Source} from "../../model/source/source-model";

@Injectable({
  providedIn: 'root'
})
export class CharacterClassService {

  private readonly apiUrl: string;
  private contextPath = '/characterClass';
  private getAllCharactersEndPoint = '/getAll';
  private getCharacterByIdEndPoint = '/getById/';
  private getClassesFromSourcesEndPoint = '/getClassesFromSources';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  public getCharacterClasses(): Observable<Array<CharacterClass>> {
    return this.http.get<Array<CharacterClass>>(this.apiUrl + this.contextPath + this.getAllCharactersEndPoint);
  }

  public getCharacterClassById(id: number): Observable<CharacterClass> {
    return this.http.get<CharacterClass>(this.apiUrl + this.contextPath + this.getCharacterByIdEndPoint + id);
  }

  public getClassesFromSources(sources: Source[]): Observable<CharacterClass[]> {
    return this.http.post<CharacterClass[]>(this.apiUrl + this.contextPath + this.getClassesFromSourcesEndPoint, sources);
  }

}
