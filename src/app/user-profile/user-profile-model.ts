export class UserProfileModel {
  identity: {
    uid: string;
  };
  email: string;
  displayName: string;
  aboutMe?: string;
  profileAvatar?: {
    imageId: number;
    fileName: string;
    fileType: string;
    data: any;
  };
}
