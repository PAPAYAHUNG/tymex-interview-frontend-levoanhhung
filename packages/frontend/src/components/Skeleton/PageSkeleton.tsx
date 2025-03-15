import { Skeleton } from 'antd';
import React from 'react';

const PageSkeleton: React.FC = () => {
  return (
    <div className="page-skeleton">
      <Skeleton active paragraph={{ rows: 4 }} />
      <div style={{ marginTop: '2rem' }}>
        <Skeleton.Image active />
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
    </div>
  );
};

export default PageSkeleton; 