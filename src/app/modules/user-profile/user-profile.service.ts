import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserProfileRequest} from './user-profile-request';
import { Constants } from '../../shared/constants/constants';
import {UserProfile} from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  apiUrl: string;
  urls: any;
  userProfile: UserProfile;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
    this.urls = Constants.userProfileUrls;
  }

  getUserProfileById(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl + this.urls.basePath + this.urls.getById + id);
  }

  saveProfile(profile: UserProfileRequest): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.apiUrl + this.urls.basePath + this.urls.saveProfile, profile);
  }

  updateProfile(profile: FormData): Observable<UserProfile> {
    return this.http.put<UserProfile>(this.apiUrl + this.urls.basePath + this.urls.update, profile);
  }

  getOrCreateProfile(profile: FormData) {
    this.http.post<UserProfile>(this.apiUrl + this.urls.basePath + this.urls.getOrCreate, profile).subscribe(res => this.userProfile = res);
  }

  getUserProfileEmail() {
    return this.userProfile.email;
  }

  getUserProfileAvatarUrl() {
    return this.userProfile.profileAvatarUrl;
  }

  manageProfile(userProfile: UserProfileRequest) {
    return this.http.put<UserProfile>(this.apiUrl + this.urls.basePath + this.urls.manage, userProfile);
  }
}
