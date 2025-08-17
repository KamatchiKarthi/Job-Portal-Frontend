import instance from './axioConfig';

export const loginApi = async credential => {
  try {
    const response = await instance.post('api/auth/login', credential);
    return response.data;
  } catch (error) {
    console.log('Login API Failed', error);
    throw error;
  }
};

export const registerApi = async userData => {
  try {
    const res = await instance.post('/api/auth/register', userData);
    return res.data; // success data from backend
  } catch (err) {
    // Make sure to throw the backend error message
    if (err.response) {
      // Send backend error (like "User already exists") to caller
      throw new Error(err.response.data.message || 'Registration failed');
    }
    throw err; // network or unknown error
  }
};

export const getMe = async () => {
  try {
    const response = await instance.get('api/auth/me');
    return response.data;
  } catch (error) {
    console.log('profile get error', error);
    throw error;
  }
};

export const updateUserProfile = async userData => {
  try {
    const response = await instance.put('api/auth/update', userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
