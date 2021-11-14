import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {Race} from '../../model/race/race';
import {Source} from "../../model/source/source-model";

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private readonly apiUrl: string;
  private contextPath: string = '/races';
  private getAllRacesEndpoint: string = '/getAll';
  private getRaceByIdEndPoint: string = '/getRaceById/';
  private getRacesFromSourcesEndPoint: string = '/getRacesFromSources';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  public getAllRaces(): Observable<Array<Race>> {
    return this.http.get<Array<Race>>(this.apiUrl + this.contextPath + this.getAllRacesEndpoint);
  }

  public getRaceById(selectedRaceId: number): Observable<Race> {
    return this.http.get<Race>(this.apiUrl + this.contextPath + this.getRaceByIdEndPoint + selectedRaceId);
  }

  public getRacesForSources(sources: Source[]): Observable<Race[]> {
    return this.http.post<Race[]>(this.apiUrl + this.contextPath + this.getRacesFromSourcesEndPoint, sources);
  }
}
