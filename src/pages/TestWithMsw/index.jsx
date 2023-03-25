import axios from 'axios';
import React, { useEffect, useState } from 'react';

const url = 'https://randomuser.me/api/?inc=name';

function App() {
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('../../mocks/browser');
    worker.start();
  }
  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then(({ data }) => {
      const { first, last } = data.results[0].name;
      setFullName(`${first} ${last}`);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <div>Loading.....</div>;
  }
  return (
    <div>
      <input
        type="text"
        placeholder={'Type your name'}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <div>
        <span>{fullName}</span>
      </div>
    </div>
  );
}

export default App;
