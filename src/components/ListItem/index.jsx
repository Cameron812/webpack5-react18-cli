import React from 'react';
const ListItem = React.memo(({ item, onRemove, onUpdateName }) => {
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
      {onRemove && (
        <button type="button" onClick={() => onRemove(item.id)}>
          -
        </button>
      )}
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

export default ListItem;
