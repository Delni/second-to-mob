import React, { useState } from 'react'
import './App.scss'
import { Timer } from './components/Timer';

function App() {

  return (
    <div className="App">
      Hello, World!
      <Timer time={10}/>
    </div>
  )
}

export default App
