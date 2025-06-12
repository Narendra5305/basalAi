import { useState , useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import {BrowserRouter as Router , Routes, Route,Link } from "react-router-dom";
import { Navbar } from '../components/navbar';
import { CandidatePage } from '../pages/candidatePage';
import {SigninPage} from '../pages/signinPage';
import { SignupPage } from '../pages/signupPage';

import { JobPotalContext } from '../context/contextApi';
import { CompanyPage } from '../pages/companyPage';
import { RequestPage } from '../pages/requestPage';
import PrivateRoute from '../components/privateRoute';


function App() {
  const [count, setCount] = useState(0)
  const { role } = useContext(JobPotalContext);

  return (
    <Router>
      
      <Navbar/>
      <Routes>
        <Route path='/' element={<PrivateRoute>{role==="company" ? <CompanyPage/> :<CandidatePage/>} </PrivateRoute> }/>
        <Route path='/signIn' element={<SigninPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/requests' element={ <PrivateRoute><RequestPage/></PrivateRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
