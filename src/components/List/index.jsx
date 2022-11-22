import React from 'react';
import { ListItem, ListItemWithRemove, ListItemWithUpdate } from '../ListItem';
const List = React.memo(({ list, onRemove, onUpdateName }) => {
  console.log('List');
  return (
    <ul>
      {list.map((item) => {
        if (onRemove)
          return (
            <ListItemWithRemove key={item.id} item={item} onRemove={onRemove} />
          );
        if (onUpdateName)
          return (
            <ListItemWithUpdate
              key={item.id}
              item={item}
              onUpdateName={onUpdateName}
            />
          );
        return <ListItem key={item.id} item={item} />;
      })}
    </ul>
  );
});
export default List;
