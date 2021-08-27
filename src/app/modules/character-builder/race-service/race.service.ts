import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {RaceModel} from '../model/race/race-model';

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

  public getAllRaces(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>(this.apiUrl + this.contextPath + this.getAllRacesEndpoint);
  }

  getRaceById(selectedRaceId: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(this.apiUrl + this.contextPath + this.getRaceByIdEndPoint + selectedRaceId);
  }
}
