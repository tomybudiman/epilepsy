import {axios} from '@utils/axios.ts';
import {API} from '@utils/constants.ts';

export const checkEmailAddress = async ({email}: {email: string}) => {
  const response = await axios({
    method: 'post',
    url: API.AUTH_CHECK_EMAIL_ADDRESS,
    data: {email},
  });
  return response.data;
};
