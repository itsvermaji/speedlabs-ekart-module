import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Products from './pages/Products';
import MakeCourses from './components/MakeCourses';
import Course from './pages/Course';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/courses" component={Course} />
          <Route path="/makecourse" component={MakeCourses} />
          {/* <Route path="/products" component={Products} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
