import './App.css';
import React from 'react';
import PropTypes from 'prop-types';
import Notification from '../Notifications/Notification';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

function App({ isLoggedIn }) {
  return (
    <>
     <Notification />
     <div className="App">
      <Header />
      {isLoggedIn ? (
        <CourseList />
      ) : (
        <Login />
      )}
      <Footer />
     </div>
    </>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool
}

App.defaultProps = {
  isLoggedIn: false
}

export default App;
