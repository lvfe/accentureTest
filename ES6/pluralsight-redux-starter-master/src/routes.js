import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import DashPage from './components/course/DashPage';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={DashPage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="home" component={HomePage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
