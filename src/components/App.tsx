import React from 'react'
import '../resources/styles/App.sass'
import { Timer } from './Timer'

function App() {

  return (
    <div className="App">
      <h1>Second to Mob !</h1>
      <Timer seconds={100} />
    </div>
  )
}

export default App
