import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserProfileModel} from './user-profile-model';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  apiUrl: string;
  urls: any;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
    this.urls = Constants.userProfileUrls;
  }

  getUserProfileById(id: string): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(this.apiUrl + this.urls.basePath + this.urls.getById + id);
  }

  saveProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    return this.http.post<UserProfileModel>(this.apiUrl + this.urls.basePath + this.urls.saveProfile, profile);
  }

  updateProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    return this.http.put<UserProfileModel>(this.apiUrl + this.urls.basePath + this.urls.update, profile);
  }

  getOrCreateProfile(profile: FormData): Observable<UserProfileModel> {
    console.log('Profile to save: ' + JSON.stringify(profile));
    return this.http.post<UserProfileModel>(this.apiUrl + this.urls.basePath + this.urls.getOrCreate, profile);
  }


}
