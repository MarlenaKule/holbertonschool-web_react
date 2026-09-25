import logo from './assets/holberton-logo.jpg';

import './App.css';

const App = () => {
  const date = new Date();

  return (
    
    <>
    <div className="App-header">
        <img src={logo} alt="holberton logo" />
        <h1 style={{ color: '#E1003C' }}>School dashboard</h1>
      </div>
      
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>

      <footer className="App-footer">
        <p>Copyright {date.getFullYear()} - holberton School</p>
      </footer>
    </>
  )
}

export default App;