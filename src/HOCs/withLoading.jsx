import React from 'react';

export const withLoading = (Component) => (props) => {
  return (
    <div>
      <Component {...props} />
      <div className="interactions">
        {props.isLoading && <span>Loading...</span>}
      </div>
    </div>
  );
};
