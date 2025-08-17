import { useState, useEffect } from 'react';
import { Tabs, Card, List, Spin, Tag, Button, message } from 'antd';
import { getRecommendedJobs, getMyApplication } from '../../api/applicationApi';
import JobCard from '../../components/Jobcard';
import { Link, Outlet } from 'react-router';
import LoadingSpinner from '../../components/LoadSpinner';

const { TabPane } = Tabs;

const JobSeekerDashboard = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState({
    jobs: true,
    applications: true,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobResponse = await getRecommendedJobs();
        console.log(jobResponse.data);
        setRecommendedJobs(jobResponse.data);
      } catch (error) {
        message.warning('failed to fetch movies', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleTabChange = async key => {
    if (key === '2' && applications.length === 0) {
      setLoading(prev => ({ ...prev, applications: true }));
    }
    try {
      const response = await getMyApplication();
      console.log(response.applications);
      setApplications(response.applications || []);
    } catch (error) {
      message.warning('failed to load applications', error);
    } finally {
      setLoading(prev => ({ ...prev, applications: false }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Tabs
        defaultActiveKey="1"
        onChange={handleTabChange}
        items={[
          {
            key: '1',
            label: 'Recommended Jobs',
            children: loading.jobs ? (
              <div className="text-center py-12">
                <Spin size="large" />
              </div>
            ) : (
              <div className="grid gap-6">
                {recommendedJobs.length > 0 ? (
                  recommendedJobs.map(job => (
                    <JobCard key={job._id} job={job} />
                  ))
                ) : (
                  <Card>
                    <p className="text-gray-500">No recommended jobs found</p>
                  </Card>
                )}
              </div>
            ),
          },
          {
            key: '2',
            label: 'My Applications',
            children: loading.applications ? (
              <div className="text-center py-12">
                <LoadingSpinner />
              </div>
            ) : (
              <List
                itemLayout="vertical"
                dataSource={applications}
                renderItem={app =>
                  app.job ? (
                    <List.Item>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">
                            <Link to={`/jobs/${app.job._id}`}>
                              {app.job.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600">
                            {app.job.company.name}
                          </p>
                          <p className="text-gray-500">
                            Applied on:{' '}
                            {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                          <Tag
                            color={
                              app.status === 'pending'
                                ? 'orange'
                                : app.status === 'accepted'
                                ? 'green'
                                : 'red'
                            }
                          >
                            {app.status}
                          </Tag>
                        </div>
                        <Link to={`/jobs/${app.job._id}`}>
                          <Button type="link">View Job</Button>
                        </Link>
                      </div>
                    </List.Item>
                  ) : (
                    <h1 className="flex justify-center items-center min-h-50">
                      {' '}
                      Submit your job applications and take the chance to
                      experience new opportunities and possibilities in life.
                    </h1>
                  )
                }
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default JobSeekerDashboard;
