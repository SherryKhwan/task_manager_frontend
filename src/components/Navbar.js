// Navbar for the webapp

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/global.css";


const Navbar = () => {

    const { pathname } = useLocation();

    const [activeScreen, setActiveScreen] = useState(pathname)

    useEffect(() => {
        setActiveScreen(pathname)
    }, [])

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" onClick={() => setActiveScreen("/")} className="logo h5 m-0 font-color">
                    Task Creator App
                </Link>
                <div className="nav-elements">
                    <ul className="m-0">
                        <li>
                            <Link className={activeScreen === "/" ? "active" : ""}
                                onClick={() => setActiveScreen("/")} to="/">Home</Link>
                        </li>
                        <li>
                            <Link className={activeScreen === "all" ? "active" : ""}
                                onClick={() => setActiveScreen("all")} to="/all">All Tasks</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;