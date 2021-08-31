import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Feat} from "../model/feat/feat-model";

@Injectable({
  providedIn: 'root'
})
export class FeatService {

  private readonly apiUrl: string;
  private contextPath = '/feats';
  private getAllFeatsEndpoint = '/getAll';
  private getFeatByIdEndPoint = '/getFeatById/';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  public getFeatById(id: number): Observable<Feat> {
    return this.http.get<Feat>(this.apiUrl + this.contextPath + this.getFeatByIdEndPoint + id);
  }

  public getAllFeats(): Observable<Array<Feat>> {
    return this.http.get<Array<Feat>>(this.apiUrl + this.contextPath + this.getAllFeatsEndpoint);
  }

}
