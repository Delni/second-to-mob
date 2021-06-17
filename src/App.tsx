import React, { useState } from 'react'
import './App.scss'
import { Timer } from './components/Timer';
import { Mob } from './components/Mob';

function App() {

  return (
    <div className="App">
      <Timer time={10}/>
      <Mob />
    </div>

  )
}

export default App
