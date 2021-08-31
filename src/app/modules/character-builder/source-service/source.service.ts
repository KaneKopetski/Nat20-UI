import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Source} from "../model/source/source-model";

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private readonly apiUrl: string;
  private contextPath = '/sources';
  private getAllSourcesEndpoint = '/getAll';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  public getAllSources(): Observable<Array<Source>> {
    return this.http.get<Array<Source>>(this.apiUrl + this.contextPath + this.getAllSourcesEndpoint);
  }
}
