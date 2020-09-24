export class UserProfileRequest {
  uid: string;
  email: string;
  displayName: string;
  aboutMe?: string;
  newProfileAvatar?: File;
}
