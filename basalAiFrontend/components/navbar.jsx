import React from "react"

import "./componentCss/navbar.css"
import { useNavigate } from "react-router"

export const  Navbar = () =>{
    const navigate = useNavigate()
    return(
        <nav>
            <div id="navbar">
                <div className="navbar-cont">
                    <div className="logo-cont">
                        <img src="https://www.basalanalytics.com/assets/logo/BA-Logo-Header.png" alt="logo" />
                    </div>

                    <div className="navbar-option">
                        <ul>
                            <li>JOBS</li>
                            <li>Tech Companies</li>
                            <li>Remote</li>
                            <li>Learn</li>
                        </ul>
                        
                    </div>

                    <div className="auth-nav">
                       <button onClick={()=>navigate("/signin")}>Sign in</button>
                    </div>

                </div>
            </div>
        </nav>
    )
}