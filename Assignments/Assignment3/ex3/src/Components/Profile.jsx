import { useState } from 'react'
import './App.css'

function Profile(props) {

  return (
    <>
     <div className="card">
        
        <h1>{props.name}</h1>

     </div>
    </>
  )
}

export default App;