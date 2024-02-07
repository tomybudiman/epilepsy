import {API_HOST} from '@env';

export const API = {
  AUTH_CHECK_EMAIL_ADDRESS: `${API_HOST}/api/v1/user/checkEmail`,
  AUTH_SIGN_IN_USER: `${API_HOST}/api/v1/user/signIn`,
};
