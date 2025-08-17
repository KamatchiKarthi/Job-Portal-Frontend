import { Spin } from 'antd';

const LoadingSpinner = ({ fullPage = false }) => {
  return (
    <div className={`flex justify-center items-center ${fullPage ? 'min-h-screen' : 'py-12'}`}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpinner;