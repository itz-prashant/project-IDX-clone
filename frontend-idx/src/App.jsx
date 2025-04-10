import { useState } from 'react'
import './App.css'
import PingComponents from './components/atoms/PingComponents'


function App() {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <>
      <button onClick={()=> setIsVisible(!isVisible)}>Toggle</button>
      {isVisible && <PingComponents />}
    </>
  )
}

export default App
