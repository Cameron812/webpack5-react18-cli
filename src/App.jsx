import React, { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const About = lazy(() =>
  import(/* webpackChunkName: 'about' */ './pages/About')
);
const Home = lazy(() => import(/* webpackChunkName: 'home' */ './pages/Home'));
console.log(2);
function App() {
  return (
    <div>
      <h1>React CLI</h1>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
