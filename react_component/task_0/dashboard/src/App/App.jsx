/* eslint-disable */
import { Component } from 'react';
import CourseList from '../CourseList/CourseList'
import '../CourseList/CourseList.css'
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { getLatestNotification } from '../utils/utils';
import './App.css'



class App extends Component {
  constructor(props) {
    super(props);
    this.notificationsList = [
      {
        id: 1,
        type: 'default',
        value: 'New course available'
      },
      {
        id: 2,
        type: 'urgent',
        value: 'New resume available'
      },
      {
        id: 3,
        type: 'urgent',
        html: { __html: getLatestNotification() }
      }
    ];
    this.coursesList = [
      { id: 1, name: "ES6", credit: "60" },
      { id: 2, name: "Webpack", credit: "20" },
      { id: 3, name: "React", credit: "40" },
    ];
  }

  render() {
    const { isLoggedIn = false } = this.props;

    return (
      <>
        <div className="root-notifications">
          <Notifications notifications={this.notificationsList} displayDrawer={true} />
        </div>
        <Header />
        {isLoggedIn ? (
          <div className='courses-body'>
            <CourseList courses={this.coursesList} />
          </div>
        ) : (
          <Login />
        )}
        <Footer />
      </>
    );
  }
}

export default App;