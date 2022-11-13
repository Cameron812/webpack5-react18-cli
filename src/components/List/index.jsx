import React from 'react';
import ListItem from '../ListItem';

const List = React.memo(({ list, onRemove, onUpdateName }) => {
  console.log('List');
  return (
    <ul>
      {list.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onUpdateName={onUpdateName}
        />
      ))}
    </ul>
  );
});
export default List;
