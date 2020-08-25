import React, { Component, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Homepage from './components/Homepage.jsx';
import Search from './components/Search.jsx';
import Episode from './components/Episode.jsx';
import Location from './components/Location.jsx';
import Tag from './components/Tag.jsx';
import Date from './components/Date.jsx';
import Course from './components/Course.jsx';
import School from './components/School.jsx';
import Schools from './components/Schools.jsx';
import WhatIs from './components/about/WhatIs.jsx';
import Staff from './components/about/Staff.jsx';
import TermsOfService from './components/about/TermsOfService.jsx';
import './App.css';

const App = () => {
  const searchRef = useRef();

  const onSearch = (e) => {
    e.preventDefault();
    if (searchRef.current.value) {
      window.location.href = `${process.env.PUBLIC_URL}/search/basic/${searchRef.current.value}`;
    };
  };
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <h1>
          <Link to={'/'}>
            The History Engine
          </Link>
        </h1>
        <form
          onSubmit={onSearch}
        >
          <input
            type='text'
            ref={searchRef}
          />
        </form>
        <nav>
          <span>explore</span>
          <Link to='/about/what_is_the_history_engine'>
            about
          </Link>
        </nav>
        <Switch>
          <Route path={'/search/basic/:searchTerms'}>
            <Search />
          </Route>
          <Route path={'/episodes/view/:id'}>
            <Episode />
          </Route>
          <Route path={'/fips/view/:id'}>
            <Location />
          </Route>
          <Route path={'/tags/view/:id'}>
            <Tag />
          </Route>
          <Route path={'/timeline/:id'}>
            <Date />
          </Route>
          <Route path={'/courses/view/:id'}>
            <Course />
          </Route>
          <Route path={'/school/view/:id'}>
            <School />
          </Route>
          <Route path={['/about', '/schools']}>
            <div className='about'>
              <Route path={'/schools'}>
                <Schools />
              </Route>
              <Route path={'/about/staff_and_sponsors'}>
                <Staff />
              </Route>
              <Route path={'/about/terms_of_service'}>
                <TermsOfService />
              </Route>
              <Route path={['/about', '/about/what_is_the_history_engine']}>
                <WhatIs />
              </Route>
              <nav>
                <Link to='/about/what_is_the_history_engine'>
                  What Is the History Engine?
                </Link>
                <Link to='/schools'>
                  Schools Using the History Engine
                </Link>
                <Link to='/about/staff_and_sponsors'>
                  Staff and Sponsors
                </Link>
                <Link to='/about/terms_of_service'>
                  Terms of Service
                </Link>
              </nav>
            </div>
          </Route>
          <Route path={'/'}>
            <Homepage />
          </Route>
        </Switch>
        <footer>
          Digital Scholarship Lab   © 2008–2020 The University of Richmond
        </footer>
      </div>
    </Router>
  );
};

export default App;
