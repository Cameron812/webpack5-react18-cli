import React from 'react';

export const withInfiniteScroll = (conditionFn) => (Component) => (props) => {
  const { onPaginatedSearch } = props;
  const onScroll = () => conditionFn(props) && onPaginatedSearch();

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll, false);
    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
  });
  return <Component {...props} />;
};
