import React from 'react';
import { withLoading, withPaginated } from '../../HOCs';
import './index.less';

const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=5`;

const applyUpdateResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
  isLoading: false
});

const applySetResult = (result) => ({
  hits: result.hits,
  page: result.page,
  isLoading: false
});

export default function PaginatedList() {
  const [text, setText] = React.useState('');
  const [list, setList] = React.useState({
    hits: [],
    page: null,
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
      .then((result) => onSetResult(result, page));
  };
  const onSetResult = (result, page) =>
    page === 0
      ? setList(applySetResult(result))
      : setList(applyUpdateResult(result));

  return (
    <div className="page">
      <h2>Paginated List in React </h2>
      <div className="interactions">
        <form onSubmit={onInitialSearch}>
          <input type="text" value={text} onChange={handleTextChange} />
          <button type="submit">Search</button>
        </form>
      </div>

      <ListWithLoadingWithPaginated
        list={list.hits}
        page={list.page}
        isLoading={list.isLoading}
        onPaginatedSearch={onPaginatedSearch}
      />
    </div>
  );
}
const List = ({ list }) => (
  <div className="list">
    {list.map((item) => (
      <div className="list-row" key={item.objectID}>
        <a href={item.url}>{item.title}</a>
      </div>
    ))}
  </div>
);

const ListWithLoadingWithPaginated = withLoading(withPaginated(List));
