import React, { useEffect } from 'react';
import List from '../../components/List';
import userService from '../../services/user.service';

const DerivedFromProps = () => {
  const [users, setUsers] = React.useState([]);
  const handleUpdateName = React.useCallback(
    (item, name) => {
      const updateUserName = async () => {
        const updatedUsers = await userService.updateFakeUserName(
          users,
          item.id,
          name
        );
        setUsers(updatedUsers);
      };
      updateUserName();
    },
    [users]
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getFakeUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>Derive State from Props in React</h2>
      <List list={users} onUpdateName={handleUpdateName} />
    </div>
  );
};

export default DerivedFromProps;
