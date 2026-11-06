/* global process */
import { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import CourseList from "../CourseList/CourseList";
import "../CourseList/CourseList.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Notifications from "../Notifications/Notifications";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import NewContext from "../Context/context";
import { getLatestNotification } from "../utils/utils.js";
import "./App.css";

const defaultUser = {
  email: "",
  password: "",
  isLoggedIn: false,
};

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  // Notifications: fetched once, when the component first renders
  useEffect(() => {
    let cancelled = false;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5173/notifications.json");
        const data = response.data.map((notification) =>
          notification.id === 3
            ? { ...notification, html: { __html: getLatestNotification() } }
            : notification
        );
        if (!cancelled) setNotifications(data);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();

    return () => {
      cancelled = true;
    };
  }, []);

  // Courses: fetched whenever the user state changes
  useEffect(() => {
    let cancelled = false;

    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5173/courses.json");
        if (!cancelled) setCourses(response.data);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching courses:", error);
        }
      }
    };

    fetchCourses();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const logOut = useCallback(() => {
    setUser({ email: "", password: "", isLoggedIn: false });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  const contextValue = useMemo(() => ({ user, logOut }), [user, logOut]);

  return (
    <NewContext.Provider value={contextValue}>
      <div className="notifications-header">
        <Header />
        <div className="root-notifications">
          <Notifications
            notifications={notifications}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={handleDisplayDrawer}
            handleHideDrawer={handleHideDrawer}
            markNotificationAsRead={markNotificationAsRead}
          />
        </div>
      </div>

      {user.isLoggedIn ? (
        <BodySectionWithMarginBottom title="Course list">
          <CourseList courses={courses} />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login logIn={logIn} email={user.email} password={user.password} />
        </BodySectionWithMarginBottom>
      )}

      <BodySection title="News from the School">
        <p>Holberton School News goes here</p>
      </BodySection>

      <Footer />
    </NewContext.Provider>
  );
}

export default App;