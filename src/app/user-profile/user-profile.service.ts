import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserProfileModel } from './user-profile-model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  urls = {
    apiUrl: '',
    basePath: '/userProfile',
    getById: '/getById/',
    getOrCreate: '/getOrCreateTest',
    saveProfile: '/save',
    update: '/update'
  };


  // private readonly apiUrl;
  private readonly uid: string;
  // private basePath = '/userProfile';
  // private getById = '/getById/';
  // private getOrCreate = '/getOrCreateTest';
  // private saveProfile = '/save';
  // private update = '/update';

  constructor(private http: HttpClient) {
    this.urls.apiUrl = environment.apiURL;
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
  }


  getUserProfileById(id: string): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(this.urls.apiUrl + this.urls.basePath + this.urls.getById + id);
  }

  saveProfile(user: firebase.User): Observable<UserProfileModel> {
    return this.http.post<UserProfileModel>(this.urls.apiUrl + this.urls.basePath + this.urls.saveProfile, this.createProfileFromUser(user));
  }

  updateProfile(profile: UserProfileModel): Observable<UserProfileModel> {
    profile.uid = this.uid;
    return this.http.put<UserProfileModel>(this.urls.apiUrl + this.urls.basePath + this.urls.update, profile);
  }

  private createProfileFromUser(user: firebase.User): UserProfileModel {
    const newProfile: UserProfileModel = new UserProfileModel();
    newProfile.uid = user.uid;
    newProfile.displayName = user.displayName;
    newProfile.email = user.email;
    return newProfile;
  }


}
