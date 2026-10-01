// App.jsx
import './App.css';
import { Fragment } from 'react';
import Notifications from "../Notifications/Notifications.jsx";
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';

function App() {
  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: 'Urgent requirement - complete by EOD' } },
  ];

  return (
    <Fragment>
      <Notifications notifications={notificationsList} />
      <div className="App">
        <Header />
        <Login />
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
