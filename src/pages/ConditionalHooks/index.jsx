import React from 'react';

const LIST = [
  {
    id: '1',
    title: 'The Road to React'
  },
  {
    id: '2',
    title: 'The Road to GraphQL'
  }
];
const ConditionalHooks = () => {
  const [list, setList] = React.useState([]);

  const handleFetch = () => {
    setList(LIST);
  };

  if (!list.length) {
    return (
      <div>
        <h2>Conditional Hooks in React</h2>
        <div style={{ width: '300px' }}>
          In conclusion, most often when rendering hooks conditionally, in a
          loop, or in a changed order, move the hook one level down to the child
          component where it has its fixed place and is computed with the
          component without any condition.{' '}
        </div>
        <button type="button" onClick={handleFetch}>
          Fetch
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Conditional Hooks in React</h2>
      <div
        style={{
          width: '600px',
          backgroundColor: 'yellow',
          padding: '5px',
          border: '2px solid red'
        }}
      >
        In conclusion, most often when rendering hooks conditionally, in a loop,
        or in a changed order, move the hook one level down to the child
        component where it has its fixed place and is computed with the
        component without any condition.{' '}
      </div>
      <List list={list} />
    </div>
  );
};

const List = ({ list }) => {
  const [selectedId, setSelectedId] = React.useState(list[0].id);
  return (
    <ul>
      {list.map((item) => (
        <Item
          key={item.id}
          item={item}
          selectedId={selectedId}
          onSelectedId={setSelectedId}
        />
      ))}
    </ul>
  );
};

const Item = ({ item, selectedId, onSelectedId }) => {
  const handleSelect = () => {
    onSelectedId(item.id);
  };

  const selectedStyle = {
    fontWeight: selectedId === item.id ? 'bold' : 'normal'
  };

  return (
    <li key={item.id} style={selectedStyle}>
      <span style={{ cursor: 'pointer' }} onClick={handleSelect}>
        {item.title}
      </span>
    </li>
  );
};

export default ConditionalHooks;
