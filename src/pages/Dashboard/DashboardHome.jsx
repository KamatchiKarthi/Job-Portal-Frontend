// import { Card, Row, Col, Statistic, Button, Spin } from 'antd';
// import {
//   DollarOutlined,
//   FileDoneOutlined,
//   ScheduleOutlined,
// } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../Context/Authcontext';
// import { useEffect, useState } from 'react';
// import { getRecommendedJobs, getMyApplication } from '../../api/applicationApi';

// const DashboardHome = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     recommendedJobs: 0,
//     applications: 0,
//     pendingApplications: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [jobsResponse, appsResponse] = await Promise.all([
//           getRecommendedJobs(),
//           getMyApplication(),
//         ]);

//         const pendingApps = appsResponse.data.filter(
//           app => app.status === 'pending'
//         ).length;

//         setStats({
//           recommendedJobs: jobsResponse.data.length,
//           applications: appsResponse.data.length,
//           pendingApplications: pendingApps,
//         });
//       } catch (error) {
//         console.error('Failed to load dashboard stats:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-home">
//       <h2 className="text-xl font-semibold mb-6">Welcome back, {user?.name}</h2>

//       <Row gutter={[16, 16]} className="mb-8">
//         <Col xs={24} sm={12} md={8}>
//           <Card>
//             <Statistic
//               title="Recommended Jobs"
//               value={stats.recommendedJobs}
//               prefix={<FileDoneOutlined />}
//             />
//             <Button type="link" className="p-0 mt-2">
//               <Link to="/dashboard/jobs">View all jobs</Link>
//             </Button>
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Card>
//             <Statistic
//               title="Total Applications"
//               value={stats.applications}
//               prefix={<ScheduleOutlined />}
//             />
//             <Button type="link" className="p-0 mt-2">
//               <Link to="/dashboard/applications">View applications</Link>
//             </Button>
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Card>
//             <Statistic
//               title="Pending Applications"
//               value={stats.pendingApplications}
//               prefix={<DollarOutlined />}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col span={24}>
//           <Card title="Quick Actions" className="mb-4">
//             <div className="flex flex-wrap gap-4">
//               <Link to="/dashboard/jobs">
//                 <Button type="primary">Browse Jobs</Button>
//               </Link>
//               <Link to="/dashboard/profile">
//                 <Button>View Profile</Button>
//               </Link>
//               <Link to="/dashboard/profile/edit">
//                 <Button>Edit Profile</Button>
//               </Link>
//               <Link to="/dashboard/applications">
//                 <Button>My Applications</Button>
//               </Link>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default DashboardHome;
