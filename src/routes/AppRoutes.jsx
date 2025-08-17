import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PriavateRouter';
import PublicLayout from '../layout/PublicLayout';
// import DashboardLayout from '../layout/DashboardLayout';
import EmployerLayout from '../layout/EmployerLayout';

// Public pages
import Login from '../pages/Auth/login';
import Register from '../pages/Auth/Register';
import JobList from '../pages/Jobs/JobList';
import JobDetails from '../pages/Jobs/JobDetails';
import NotFound from '../pages/NotFound';
import Home from '../components/Home';

// Protected pages
import JobSeekerDashboard from '../pages/Dashboard/JobseekerDashboard';
import EmployerDashboard from '../pages/Dashboard/EmployeerDashboard';
import CreateJob from '../pages/Jobs/CreateJob';
import MyApplications from '../pages/application/Myapplication';
import ApplyJob from '../pages/application/ApplyJob';
import UserProfile from '../pages/User/Userprofile';
import EditProfile from '../pages/User/Editprofile';
import CompanyProfile from '../pages/Company/Companyprofile';
import EditCompanyProfile from '../pages/Company/EditCompanyprofile';
import CreateCompanyProfile from '../pages/Company/CreateCompany';
import Applications from '../pages/application/Applicationpage';
import ApplicantDetailsPage from '../pages/application/ApplicationDetail';
import JobApplicants from '../pages/Jobs/JobApplications';
import JobEdit from '../pages/Jobs/JobEdit';
import ForgotPassword from '../pages/Auth/ForgetPasswordPage';
import ResetPasswords from '../pages/Auth/RestPassword';
// import DashboardHome from '../pages/Dashboard/DashboardHome';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPasswords />} />
        <Route path="jobs" element={<JobList />} />
      </Route>

      {/* Job seeker routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={['jobseeker']}>
            <JobSeekerDashboard />
          </PrivateRoute>
        }
      >
        {/* <Route path="applications" element={<MyApplications />} /> */}
        <Route path="jobs" element={<JobList />} />
        <Route path="jobs/:id/apply" element={<ApplyJob />} />
      </Route>
      <Route
        path="/applications"
        element={
          <PrivateRoute allowedRoles={['jobseeker']}>
            <MyApplications />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute allowedRoles={['jobseeker']}>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="jobs/apply/:id"
        element={
          <PrivateRoute allowedRoles={['jobseeker']}>
            <ApplyJob />
          </PrivateRoute>
        }
      />
      <Route
        path="jobs/:id"
        element={
          <PrivateRoute allowedRoles={['jobseeker']}>
            <JobDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <PrivateRoute allowedRoles={['jobseeker']}>
            <EditProfile />
          </PrivateRoute>
        }
      />

      {/* Employer routes */}
      <Route
        path="/employer"
        element={
          <PrivateRoute allowedRoles={['employer']}>
            <EmployerLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<EmployerDashboard />} />
        <Route path="jobs/create" element={<CreateJob />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/:id" element={<ApplicantDetailsPage />} />
        <Route
          path="/employer/jobs/:jobId/applicants"
          element={<JobApplicants />}
        />
        <Route path="jobs/edit/:id" element={<JobEdit />} />
        <Route path="company/create" element={<CreateCompanyProfile />} />
        <Route path="company/profile" element={<CompanyProfile />} />
        <Route path="company/profile/edit" element={<EditCompanyProfile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
