import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import {BrowserRouter as Router , Routes, Route,Link } from "react-router-dom";
import { Navbar } from '../components/navbar';
import { CandidatePage } from '../pages/candidatePage';
import SigninPage from '../pages/signinPage';



function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<CandidatePage/>}/>
        <Route path='/signIn' element={<SigninPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
