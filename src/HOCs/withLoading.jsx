import React from 'react';

export const withLoading = (conditionFn) => (Component) => (props) => {
  return (
    <div>
      <Component {...props} />
      <div className="interactions">
        {conditionFn(props) && <span>Loading...</span>}
      </div>
    </div>
  );
};
