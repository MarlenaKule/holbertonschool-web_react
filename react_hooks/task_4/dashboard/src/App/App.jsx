import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { getLatestNotification } from '../utils/utils';
import './App.css';

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });
  const [listNotifications, setListNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleDisplayDrawer = () => {
    setDisplayDrawer(true);
  };

  const handleHideDrawer = () => {
    setDisplayDrawer(false);
  };

  const logIn = (email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  };

  const logOut = () => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  };

  // Fshirja e njoftimit nga gjendja (state)
  const markAsRead = (id) => {
    setListNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  // Fetch notifications on mount
  useEffect(() => {
    axios
      .get('/notifications.json')
      .then((response) => {
        setListNotifications(response.data);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
      });
  }, []);

  // Fetch courses when user logs in
  useEffect(() => {
    if (user.isLoggedIn) {
      axios
        .get('/courses.json')
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error(error);
          }
        });
    } else {
      setCourses([]);
    }
  }, [user.isLoggedIn]);

  return (
    <React.Fragment>
      <Notifications
        listNotifications={listNotifications}
        displayDrawer={displayDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markAsRead={markAsRead}
      />
      <div className="App">
        <Header />
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login logIn={logIn} />
        </BodySectionWithMarginBottom>
        <BodySection title="News from the School">
          <p>Some random text</p>
        </BodySection>
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList listCourses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={logIn} />
          </BodySectionWithMarginBottom>
        )}
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;