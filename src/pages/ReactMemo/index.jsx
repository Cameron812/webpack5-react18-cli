import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import List from '../../components/List';

const ReactMemo = () => {
  console.log('ReactMemo');
  const [users, setUsers] = React.useState([
    { id: 'a', name: 'Robin' },
    { id: 'b', name: 'Dennis' }
  ]);
  const [text, setText] = React.useState('');
  const handleAddUser = () => {
    setUsers(users.concat({ id: uuidv4(), name: text }));
    setText('');
  };
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <h2>How to use React memo</h2>
      <p>
        Note: Don't mistake React's memo API with React's{' '}
        <Link to="/usememo-hook">useMemo</Link> hook. While React's memo API is
        used to wrap React components to prevent re-renderings, useMemo is used
        to memorize values. <br />
        <br />
        if your React component is still rendering with React memo, check out
        this guide about React's <Link to="/usecallback-hook">
          useCallback
        </Link>{' '}
        Hook. Often a re-rendering is associated with a callback handler which
        changes for every render.
      </p>
      <div>
        <input type="text" value={text} onChange={handleChange} />
        <button type="button" onClick={handleAddUser}>
          Add user
        </button>
        <List list={users} />
      </div>
      <div>
        After change the new implementation with React's memo function, by
        typing a character into the input field or adding an item to the list,
        you should see the following output:
        <pre>
          <pre
            class="prism-code language-text"
            style={{
              color: 'rgb(214, 222, 235)',
              backgroundColor: 'rgb(1, 22, 39)',
              marginBottom: '0px',
              padding: '20px',
              overflow: 'auto',
              maxWidth: 'calc(100vw - 80px)'
            }}
          >
            <div class="token-line" style={{ color: 'rgb(214, 222, 235)' }}>
              <span
                class="token plain"
                style={{ display: 'inline-block' }}
              ></span>
            </div>
            <div class="token-line" style={{ color: 'rgb(214, 222, 235)' }}>
              <span class="token plain">Render: ReactMemo</span>
            </div>
            <div class="token-line" style={{ color: 'rgb(214, 222, 235)' }}>
              <span class="token plain">Render: List</span>
            </div>
            <div class="token-line" style={{ color: 'rgb(214, 222, 235)' }}>
              <span class="token plain">Render: ListItem</span>
            </div>
          </pre>
        </pre>
      </div>
    </div>
  );
};

export default ReactMemo;
