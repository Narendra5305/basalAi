import React from "react"

import "./componentCss/navbar.css"
import { useNavigate } from "react-router"
import {JobPotalContext} from "../context/contextApi"
import { useContext } from "react"

export const  Navbar = () =>{
    const navigate = useNavigate()
     const {role  , setToken, token} = useContext(JobPotalContext);


    const handleLogout =() =>{
        localStorage.removeItem("token");
        setToken(null);
        navigate("/signin");
    }

    return(
        <nav>
            <div id="navbar">
                <div className="navbar-cont">
                    <div className="logo-cont" onClick={()=>navigate("/")}>
                        <img src="https://www.basalanalytics.com/assets/logo/BA-Logo-Header.png" alt="logo" />
                    </div>

                    <div className="navbar-option">
                        <ul>
                            <li onClick={()=>navigate("/")}>JOBS</li>
                            <li>Tech Companies</li>
                            <li>Remote</li>
                            <li>Learn</li>
                            <li onClick={()=>navigate("requests")} className={role==="company" ? "":"hide-btn"} >Interview Requests</li>
                        </ul>
                        
                    </div>

                    <div className="auth-nav">
                        {!token ? (
                            <button onClick={() => navigate("/signin")}>Sign in</button>
                        ) : (
                            <button onClick={handleLogout}>Logout</button>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    )
}