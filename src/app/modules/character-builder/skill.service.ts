import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Skill } from './model/skill/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private readonly apiUrl;
  private getSkillByIdEndpoint = '/skills/getById/';
  private getSkillPageEndpoint = '/skills/getAll';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getSkillById(id: number): Observable<Skill> {
    return this.http.get<Skill>(this.apiUrl + this.getSkillByIdEndpoint + id);
  }

  getAllSkills(pageNumber: number, pageSize: number): Observable<Skill> {
    return this.http.get<Skill>(this.apiUrl + this.getSkillPageEndpoint + pageNumber + '&size=' + pageSize);
  }

}
