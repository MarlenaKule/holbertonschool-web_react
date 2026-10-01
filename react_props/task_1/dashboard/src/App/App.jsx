import './App.css';
import React from 'react';
import Notification from '../Notifications/Notification';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';

function App() {
  return (
    <>
     <Notification />
     <div className="App">
      <Header />
      <Login />
      <Footer />
     </div>
    </>
  );
}

export default App;
