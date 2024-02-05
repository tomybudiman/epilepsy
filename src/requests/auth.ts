import {axios} from '@utils/axios.ts';
import {API} from '@utils/constants.ts';

export const checkEmailAddress = async ({email}: {email: string}) => {
  console.log(API.AUTH_CHECK_EMAIL_ADDRESS);
  // axios({
  //   method: 'get',
  // });
};
