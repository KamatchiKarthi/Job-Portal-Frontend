import { Tag } from 'antd';

const statusColors = {
  pending: 'orange',
  accepted: 'green',
  rejected: 'red',
  interviewing: 'blue',
  offered: 'purple'
};

const ApplicationStatusTag = ({ status }) => {
  return (
    <Tag color={statusColors[status] || 'default'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Tag>
  );
};

export default ApplicationStatusTag;