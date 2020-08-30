import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserProfileModel } from './user-profile-model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private readonly apiUrl;
  private readonly uid: string;
  private basePath = '/userProfile';
  private getById = '/getById/';
  private getOrCreate = '/getOrCreateTest';
  private saveProfile = '/save';
  private saveOrUpdate = '/saveOrUpdate';
  private update = '/update';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
  }


  getUserProfileById(id: string): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(this.apiUrl + this.basePath + this.getById + this.uid);
  }

  getOrCreateProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    profile.uid = this.uid;
    return this.http.post<UserProfileModel>(this.apiUrl + this.basePath + this.getOrCreate, profile);
  }

  createProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    profile.uid = this.uid;
    return this.http.post<UserProfileModel>(this.apiUrl + this.basePath + this.saveProfile, profile);
  }

  updateOrCreateProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    profile.uid = this.uid;
    return this.http.put<UserProfileModel>(this.apiUrl + this.basePath + this.saveOrUpdate, profile);
  }

  updateProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    profile.uid = this.uid;
    return this.http.put<UserProfileModel>(this.apiUrl + this.basePath + this.update, profile);
  }

}
