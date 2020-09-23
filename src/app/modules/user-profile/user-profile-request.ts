export class UserProfileRequest {
  uid: string;
  email: string;
  displayName: string;
  aboutMe?: string;
  newProfileAvatar?: {
    imageId: number;
    fileName: string;
    fileType: string;
    data: any;
  };
}
