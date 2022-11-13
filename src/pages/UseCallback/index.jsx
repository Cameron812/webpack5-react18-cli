import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from '../../components/List';
const UseCallback = () => {
  console.log('use callback');
  const [users, setUsers] = React.useState([
    { id: 'a', name: 'Robin' },
    { id: 'b', name: 'Dennis' }
  ]);

  const [text, setText] = React.useState('');

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleAddUser = () => {
    if (!text.length) return;
    if (users.findIndex((user) => user.name === text) >= 0) return;
    setUsers(users.concat({ id: uuidv4(), name: text }));
    setText('');
  };

  const handleRemove = React.useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  return (
    <div>
      <h2>How to useCallback in React</h2>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>

      <List list={users} onRemove={handleRemove} />
    </div>
  );
};

export default UseCallback;
