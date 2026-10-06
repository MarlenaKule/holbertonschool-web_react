import React from 'react'
import './Login.css'

function Login() {
  return (
    <div className="App-body">
      <p> Login to access the full dashboard</p>

      <label for="email">Email Address:</label>
      <input type="email" id="email"></input>

      <label for="password">Password:</label>
      <input type="password" id="password"></input>

      <button type="submit">Ok</button>
    </div>
  )
}

export default Login