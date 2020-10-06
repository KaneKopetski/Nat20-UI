import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserProfileRequest} from './user-profile-request';
import { Constants } from '../../shared/constants/constants';
import {UserProfileResponse} from './user-profile-response';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  apiUrl: string;
  urls: any;
  userProfile: UserProfileResponse;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
    this.urls = Constants.userProfileUrls;
  }

  getUserProfileById(id: string): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(this.apiUrl + this.urls.basePath + this.urls.getById + id);
  }

  saveProfile(profile: UserProfileRequest): Observable<UserProfileResponse> {
    return this.http.post<UserProfileResponse>(this.apiUrl + this.urls.basePath + this.urls.saveProfile, profile);
  }

  updateProfile(profile: FormData): Observable<UserProfileResponse> {
    console.log('URL: ' + this.apiUrl + this.urls.basePath + this.urls.update);
    console.log('UID: ' + profile.get('uid'));
    return this.http.put<UserProfileResponse>(this.apiUrl + this.urls.basePath + this.urls.update, profile);
  }

  getOrCreateProfile(profile: FormData) {
    this.http.post<UserProfileResponse>(this.apiUrl + this.urls.basePath + this.urls.getOrCreate, profile).subscribe(res => this.userProfile = res);
  }

  getUserProfileEmail() {
    return this.userProfile.email;
  }

  getUserProfileAvatarUrl() {
    return this.userProfile.profileAvatarUrl;
  }

}
