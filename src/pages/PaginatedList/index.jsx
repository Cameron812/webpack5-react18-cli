import React from 'react';
import { ListItemWithLink } from '../../components/ListItem';
import { withInfiniteScroll, withLoading, withPaginated } from '../../HOCs';
import './index.less';

const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=10`;

const applyUpdateResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
  isError: false,
  isLoading: false
});

const applySetResult = (result) => ({
  hits: result.hits,
  page: result.page,
  isError: false,
  isLoading: false
});

const applySetError = (list) => ({
  ...list,
  isLoading: false,
  isError: true
});
export default function PaginatedList() {
  const [text, setText] = React.useState('');
  const [list, setList] = React.useState({
    hits: [],
    page: null,
    isError: false,
    isLoading: false
  });

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const onInitialSearch = (e) => {
    e.preventDefault();
    if (text === '') return;
    fetchStories(text, 0);
  };

  const onPaginatedSearch = () => {
    fetchStories(text, list.page + 1);
  };

  const fetchStories = (value, page) => {
    setList({ ...list, isLoading: true });
    fetch(getHackerNewsUrl(value, page))
      .then((response) => response.json())
      .then((result) => onSetResult(result, page))
      .catch(onSetError);
  };

  const onSetResult = (result, page) =>
    page === 0
      ? setList(applySetResult(result))
      : setList(applyUpdateResult(result));

  const onSetError = () => setList((list) => applySetError(list));
  return (
    <div className="page">
      <h2>Paginated List in React </h2>
      <div className="interactions">
        <form onSubmit={onInitialSearch}>
          <input type="text" value={text} onChange={handleTextChange} />
          <button type="submit">Search</button>
        </form>
      </div>

      <AdvancedList
        list={list.hits}
        page={list.page}
        isError={list.isError}
        isLoading={list.isLoading}
        onPaginatedSearch={onPaginatedSearch}
      />
    </div>
  );
}
const List = ({ list }) => {
  return (
    <div className="list">
      {list.map((item) => (
        <ListItemWithLink key={item.objectID} item={item} />
      ))}
    </div>
  );
};

const paginatedCondition = (props) =>
  props.page !== null && !props.isLoading && props.isError;

const infiniteScrollCondition = (props) =>
  window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
  props.list.length &&
  !props.isLoading &&
  !props.isError;

const loadingCondition = (props) => props.isLoading;

const AdvancedList = withLoading(loadingCondition)(
  withInfiniteScroll(infiniteScrollCondition)(
    withPaginated(paginatedCondition)(List)
  )
);
