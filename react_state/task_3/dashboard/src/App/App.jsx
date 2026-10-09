// App/App.jsx
import { Component } from "react";
import CourseList from "../CourseList/CourseList";
import "../CourseList/CourseList.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Notifications from "../Notifications/Notifications";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import newContext from "../Context/context";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDrawer: false,
      user: {
        email: "",
        password: "",
        isLoggedIn: false,
      },
      logOut: this.logOut,
    };

    this.notificationsList = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      {
        id: 3,
        type: "urgent",
        html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
      },
    ];

    this.coursesList = [
      { id: 1, name: "ES6", credit: "60" },
      { id: 2, name: "Webpack", credit: "20" },
      { id: 3, name: "React", credit: "40" },
    ];

    this.handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "h") {
        e.preventDefault();
        alert("Logging you out");
        this.logOut();
      }
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  logIn = (email, password) => {
    this.setState({
      user: { email, password, isLoggedIn: true },
    });
  };

  logOut = () => {
    this.setState({
      user: { email: "", password: "", isLoggedIn: false },
    });
  };

  render() {
    const { displayDrawer, user } = this.state;

    return (
      <newContext.Provider value={this.state}>
        <div className="notifications-header">
          <Header />
          <div className="root-notifications">
            <Notifications
              notifications={this.notificationsList}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
            />
          </div>
        </div>

        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={this.coursesList} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={this.logIn} email={user.email} password={user.password} />
          </BodySectionWithMarginBottom>
        )}

        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>

        <Footer />
      </newContext.Provider>
    );
  }
}

export default App;