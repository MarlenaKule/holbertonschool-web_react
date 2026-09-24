import logo from './assets/holberton-logo.jpg';

import './App.css';

const App = () => {
  const date = new Date()

  return (
    
    <>
    <div className="App-header">
        <img src={logo} alt="Holberton Logo" />
        <h1 style={{ color: '#E1003C' }}>School dashboard</h1>
      </div>
      
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>

      <div className="App-footer">
        <p>Copywrite {date.getFullYear()} - School dashboard</p>
      </div>
    </>
  )
}

export default App;