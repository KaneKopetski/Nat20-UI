import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {Race} from '../../model/race/race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private readonly apiUrl: string;
  private contextPath = '/races';
  private getAllRacesEndpoint = '/getAll';
  private getRaceByIdEndPoint = '/getRaceById/';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  public getAllRaces(): Observable<Array<Race>> {
    return this.http.get<Array<Race>>(this.apiUrl + this.contextPath + this.getAllRacesEndpoint);
  }

  getRaceById(selectedRaceId: number): Observable<Race> {
    return this.http.get<Race>(this.apiUrl + this.contextPath + this.getRaceByIdEndPoint + selectedRaceId);
  }
}
