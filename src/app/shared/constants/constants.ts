export abstract class Constants {
  public static readonly VALID_EMAIL_MESSAGE: string = 'Email is valid';

  public static readonly PASSWORD_MIN_LENGTH_MESSAGE: string = 'Has at least 8 characters';
  public static readonly PASSWORD_HAS_CAPS_MESSAGE: string = 'Has at least one capital letter';
  public static readonly PASSWORD_HAS_LOWER_CASE_MESSAGE: string = 'Has at least one lowercase letter';
  public static readonly PASSWORD_HAS_NUMBER_MESSAGE: string = 'Has at least one number';
  public static readonly PASSWORD_HAS_SPECIAL_CHARACTER_MESSAGE: string = 'Has at least one special character';

  public static readonly PASSWORD_CONFIRMATION_MESSAGE: string = 'Passwords match';

  public static readonly FIELD_REQUIRED_MESSAGE: string = 'Field is required';

  public static readonly EMAIL_INVALID_MESSAGE: string = 'Email is in invalid format';
  public static readonly USER_NOT_FOUND_MESSAGE: string = 'Account not found';
  public static readonly USER_DISABLED_MESSAGE: string = 'This account is disabled';
  public static readonly WRONG_PASSWORD_MESSAGE: string = 'Invalid password';
  public static readonly UNKNOWN_ERROR_MESSAGE: string = 'Unknown error. Please try again later';
  public static readonly MUST_BE_LOGGED_IN: string = 'You must be logged in';

  public static readonly USER_KEY: string = 'user';
  public static readonly USER_TOKEN_KEY: string = 'userToken';

  public static readonly userProfileUrls = {
    basePath: '/userProfile',
    getById: '/getById/',
    getOrCreate: '/getOrCreate',
    saveProfile: '/save',
    update: '/update'
 };

}
