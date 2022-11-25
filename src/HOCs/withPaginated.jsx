import React from 'react';

export const withPaginated = (conditionFn) => (Component) => (props) =>
  (
    <div>
      <Component {...props} />
      <div className="interactions">
        {conditionFn(props) && (
          <div>
            <div>Something went wrong...</div>
            <button type="button" onClick={props.onPaginatedSearch}>
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
