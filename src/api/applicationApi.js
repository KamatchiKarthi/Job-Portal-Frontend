import Axiosinstance from './axioConfig';

export const applyForJob = async data => {
  try {
    const response = await Axiosinstance.post('application/applyjob', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getJobapplicationbyId = async (id, data) => {
  try {
    const response = await Axiosinstance.post(
      `application/applyjob/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyApplication = async () => {
  try {
    const response = await Axiosinstance.get('application/myjob');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getapplicantDetails = async id => {
  try {
    const response = await Axiosinstance.get(`application/applicant/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const applicantStatusChange = async (applicationId, newStatus) => {
  try {
    const response = await Axiosinstance.put(`application/statuschange/`, {
      id: applicationId,
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const applicantStatusCheck = async applicationId => {
  try {
    const response = await Axiosinstance.get(
      `application/checkstatus/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecommendedJobs = async () => {
  try {
    const response = await Axiosinstance.get('job/recommendedjobs');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetCompanyApplications = async () => {
  try {
    const response = await Axiosinstance.get('application/applicationmy');
    return response.data;
  } catch (err) {
    console.error('Error fetching applications', err);
    throw err;
  }
};

export const GetrecentApplications = async () => {
  try {
    const response = await Axiosinstance.get('/application/recent');
    return response.data;
  } catch (error) {
    console.log('error fetching recnet application', error);
    throw error;
  }
};

export const GetApplicationDetails = async applicationId => {
  try {
    const response = await Axiosinstance.get(
      `/application/applicantdet/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetJobApplications = async jobId => {
  try {
    const response = await Axiosinstance.get(`/application/job/${jobId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
