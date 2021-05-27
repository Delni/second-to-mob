import React, { useState } from 'react'
import './App.scss'
import { Timer } from './components/Timer';

function App() {

  return (
    <div className="App">
      <Timer time={60}/>
    </div>
  )
}

export default App
