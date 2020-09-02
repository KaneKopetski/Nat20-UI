import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserProfileModel } from './user-profile-model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  userProfile: UserProfileModel;

  urls = {
    apiUrl: '',
    basePath: '/userProfile',
    getById: '/getById/',
    getOrCreate: '/getOrCreate',
    saveProfile: '/save',
    update: '/update'
  };


  constructor(private http: HttpClient) {
    this.urls.apiUrl = environment.apiURL;
  }

  getUserProfileById(id: string): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(this.urls.apiUrl + this.urls.basePath + this.urls.getById + id);
  }

  saveProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    return this.http.post<UserProfileModel>(this.urls.apiUrl + this.urls.basePath + this.urls.saveProfile, profile);
  }

  updateProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    return this.http.put<UserProfileModel>(this.urls.apiUrl + this.urls.basePath + this.urls.update, profile);
  }

  getOrCreateProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    return this.http.post<UserProfileModel>(this.urls.apiUrl + this.urls.basePath + this.urls.getOrCreate, profile);
  }


}
