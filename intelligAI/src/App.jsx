import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <>
    <h1>A blog app with appwrite</h1>
    <h2>INTELLIGAI  -made with love by kay_singla</h2>

    </>
  )
}

export default App
