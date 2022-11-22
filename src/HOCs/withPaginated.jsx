import React from 'react';

export const withPaginated = (Component) => (props) =>
  (
    <div>
      <Component {...props} />
      <div className="interactions">
        {props.page !== null && !props.isLoading && (
          <button type="button" onClick={props.onPaginatedSearch}>
            More
          </button>
        )}
      </div>
    </div>
  );
