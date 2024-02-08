import {axios} from '@utils/axios.ts';
import {API} from '@utils/constants.ts';

export type CheckEmailAddress = {
  success: boolean;
  data: {token: string};
};
export type CheckEmailAddressParams = {
  email: string;
};
export const checkEmailAddress = async ({
  email,
}: CheckEmailAddressParams): Promise<CheckEmailAddress> => {
  const response = await axios({
    method: 'post',
    url: API.AUTH_CHECK_EMAIL_ADDRESS,
    data: {email},
  });
  return response.data;
};

export type SignInUser = {
  success: boolean;
  data: {token: string};
};
export type SignInUserParams = {
  email: string;
  password: string;
};
export const signInUser = async ({
  email,
  password,
}: SignInUserParams): Promise<SignInUser> => {
  const response = await axios({
    method: 'post',
    url: API.AUTH_SIGN_IN_USER,
    data: {email, password},
  });
  return response.data;
};

export type SignUpUser = {
  success: boolean;
  data: {
    id: number;
    email: string;
    password: string;
    updatedAt: string;
    createdAt: string;
    name: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    identityNumber: number | null;
    emergencyContact: number | null;
    address: string | null;
  };
};
export type SignUpUserParams = {
  email: string;
  password: string;
};
export const signUpUser = async ({
  email,
  password,
}: SignUpUserParams): Promise<SignUpUser> => {
  const response = await axios({
    method: 'post',
    url: API.AUTH_SIGN_UP_USER,
    data: {email, password},
  });
  return response.data;
};
