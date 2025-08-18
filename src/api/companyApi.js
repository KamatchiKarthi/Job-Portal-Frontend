import instance from './axioConfig';

export const CreateCompany = async companydata => {
  try {
    const response = await instance.post('company/create', companydata);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCompanyProfile = async companydata => {
  try {
    const response = await instance.put('company/update', companydata);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyProfile = async () => {
  try {
    const response = await instance.get('company/me');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
