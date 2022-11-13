import React from 'react';
import List from '../../components/List';

const users = [
  { id: 'a', name: 'Robin' },
  { id: 'b', name: 'Dennis' }
];
const UseMemo = () => {
  console.log('Use Memo');
  const [text, setText] = React.useState('');
  const [search, setSearch] = React.useState('');
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleSearch = () => {
    setSearch(text);
  };
  const filteredUsers = React.useMemo(
    () =>
      users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search]
  );
  return (
    <div>
      <h2>How to useMemo in React</h2>
      <input type="text" value={text} onChange={handleTextChange} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>

      <List list={filteredUsers} />
    </div>
  );
};
export default UseMemo;
