import instance from './axioConfig';

export const fetchJobs = async params => {
  try {
    const response = await instance.get('job/joballsearch', { params });
    return response.data;
  } catch (error) {
    console.log('error fetching job', error);
  }
};

export const getJobById = async id => {
  try {
    const response = await instance.get(`job/jobsearch/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createJob = async payload => {
  try {
    const response = await instance.post('job/jobpost', payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (id, payload) => {
  try {
    const response = await instance.put(`job/updatejob/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = async id => {
  try {
    const response = await instance.delete(`job/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetCompanyJob = async () => {
  try {
    const response = await instance.get(`job/companyjob`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

