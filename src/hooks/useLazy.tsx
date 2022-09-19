import { Spin } from 'antd';
import React, { Suspense, useMemo } from 'react';

export const useLazy = (
  lazyCallback: <T = any>() => Promise<{ default: React.ComponentType<T> }>,
) => {
  const Component = React.lazy(lazyCallback);
  return useMemo(() => function LazyComponent() {
    return (
      <Suspense fallback={(
        <div className="section_block ">
          <div className="content">
            <Spin />
          </div>
        </div>
      )}
      >
        <Component />
      </Suspense>
    );
  }, [Component]);
};
