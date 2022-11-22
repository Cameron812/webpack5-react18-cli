import React from 'react';
export const ListItem = ({ item }) => {
  return (
    <li>
      <label>{item.name}</label>
    </li>
  );
};
export const ListItemWithRemove = ({ item, onRemove }) => {
  return (
    <li>
      <label>{item.name}</label>
      <button type="button" onClick={() => onRemove(item.id)}>
        -
      </button>
    </li>
  );
};
export const ListItemWithUpdate = React.memo(({ item, onUpdateName }) => {
  console.log('ListItem');
  const [name, setName] = React.useState(item.name + '!');
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  React.useEffect(() => {
    setName(item.name + '!');
  }, [item]);
  return (
    <li>
      <label>{item.name}</label>
      {onUpdateName && (
        <span>
          <input type="text" value={name} onChange={handleNameChange} />
          <button type="button" onClick={() => onUpdateName(item, name)}>
            Update
          </button>
        </span>
      )}
    </li>
  );
});
export const ListItemWithLink = ({ item }) => {
  return (
    <div className="list-row" key={item.objectID}>
      <a href={item.url}>{item.title}</a>
    </div>
  );
};
