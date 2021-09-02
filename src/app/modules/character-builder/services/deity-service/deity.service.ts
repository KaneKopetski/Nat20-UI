import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {Deity} from "../../model/deity/deity-model";
import {Page} from "../../model/page/page-model";

@Injectable({
  providedIn: 'root'
})
export class DeityService {

  private readonly apiUrl: string;
  private contextPath = '/deity';
  private getAllDeitiesEndpoint = '/getAll';
  private getDeityByIdEndPoint = '/getDeityById/';
  private getDeityPageEndPoint = '/getDeityPage';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }
  public getDeityById(id: number): Observable<Deity> {
    return this.http.get<Deity>(this.apiUrl + this.contextPath + this.getDeityByIdEndPoint + id);
  }

  public getDeityPage(page: number, pageSize: number): Observable<Page<Deity>> {
    return this.http.get<Page<Deity>>(this.apiUrl + this.contextPath + this.getDeityPageEndPoint + '?page=' + page + '&size='+ pageSize);
  }

  public getAllDeities(): Observable<Array<Deity>> {
    return this.http.get<Array<Deity>>(this.apiUrl + this.contextPath + this.getAllDeitiesEndpoint);
  }
}
