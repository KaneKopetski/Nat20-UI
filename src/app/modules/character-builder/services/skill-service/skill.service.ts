import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {Skill} from "../../model/skill/skill";
import {Page} from "../../model/page/page-model";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private readonly apiUrl: string;
  private contextPath = '/skills';
  private getAllSkillsEndpoint = '/getAllSkills';
  private getSkillByIdEndPoint = '/getSkillById/';
  private getSkillPageEndPoint = '/getSkillPage';
  private getOfficialSkillByNameEndPoint = '/getOfficialSkillByName/';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  public getSkillById(id: number): Observable<Skill> {
    return this.http.get<Skill>(this.apiUrl + this.contextPath + this.getSkillByIdEndPoint + id);
  }

  public getAllSkills(): Observable<Array<Skill>> {
    return this.http.get<Array<Skill>>(this.apiUrl + this.contextPath + this.getAllSkillsEndpoint);
  }

  public getSkillPage(page: number, pageSize: number): Observable<Page<Skill>> {
    return this.http.get<Page<Skill>>(this.apiUrl + this.contextPath + this.getSkillPageEndPoint + '?page=' + page + '&size='+ pageSize);
  }

}
