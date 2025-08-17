import { useState, useEffect } from 'react';
import { Input, Select, Row, Col, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import JobCard from '../../components/Jobcard';
import { fetchJobs } from '../../api/jobsApi';
import LoadSpinner from '../../components/LoadSpinner';

const { Search } = Input;
const { Option } = Select;

const JobList = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    jobtype: '',
    location: '',
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs({});
        const fetchedJobs = Array.isArray(response.data[0]) ? response.data[0] : [];
        // Remove any undefined/null jobs
        const cleanJobs = fetchedJobs.filter(job => job && job._id);
        setAllJobs(cleanJobs);
        setJobs(cleanJobs);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  useEffect(() => {
    const filteredJobs = allJobs.filter(job => {
      const matchesSearch =
        !filters.search ||
        job.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType =
        !filters.jobtype || job.jobtype?.toLowerCase() === filters.jobtype.toLowerCase();

      const matchesLocation =
        !filters.location || job.location?.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesType && matchesLocation;
    });

    setJobs(filteredJobs);
  }, [filters, allJobs]);

  const handleSearch = value => setFilters({ ...filters, search: value });
  const handleFilterChange = (key, value) => setFilters({ ...filters, [key]: value });
  const handleLocationChange = e => setFilters({ ...filters, location: e.target.value });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Search
              placeholder="Search jobs by title or company"
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              allowClear
            />
          </Col>
          <Col xs={24} md={6}>
            <Select
              placeholder="Job Type"
              style={{ width: '100%' }}
              size="large"
              value={filters.jobtype || undefined}
              onChange={value => handleFilterChange('jobtype', value)}
              allowClear
            >
              <Option value="Full-time">Full-time</Option>
              <Option value="Part-time">Part-time</Option>
              <Option value="Contract">Contract</Option>
              <Option value="Internship">Internship</Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Input
              placeholder="Search by location"
              size="large"
              value={filters.location}
              onChange={handleLocationChange}
            />
          </Col>
        </Row>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <LoadSpinner />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {jobs.length > 0 ? (
            jobs.map(job => (
              <Col key={job._id || Math.random()} xs={24} sm={12} md={8}>
                {job ? <JobCard job={job} /> : null}
              </Col>
            ))
          ) : (
            <Col span={24}>
              <div className="text-center py-12 text-gray-500">
                No jobs found matching your criteria
              </div>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default JobList;
