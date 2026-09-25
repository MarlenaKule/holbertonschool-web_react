import logo from "./assets/holberton-logo.jpg";
import "./App.css";
import Notifications from './Notifications'

const App = () => {
  const date = new Date();

  return (
    <>
      <Notifications />
      <div className="App-header">
        <img src={logo} alt="holberton logo" />
        <h1 style={{ color: "#e1003c" }}>School dashboard</h1>
      </div>

      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>

      <div className="App-footer">
        <p>Copyright {date.getFullYear()} - holberton School</p>
      </div>
    </>
  );
};

export default App;
