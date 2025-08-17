import Password from 'antd/es/input/Password';
import instance from './axioConfig';

export const ForgetPassword = async email => {
  try {
    const response = await instance.post('/password/forget', { email });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ResetPassword = async (token, password) => {
  try {
    const response = await instance.post(`/password/reset`, {token,password});
    response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
