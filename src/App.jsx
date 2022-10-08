import { Outlet, Link, useLocation } from "react-router-dom";
import { createContext, useState } from 'react';

export const Context = createContext();

function App() {
    const [isLoggedIn, setLoginStatus] = useState(!!JSON.parse(localStorage.getItem('isLoggedIn')));

    const location = useLocation();
    console.log();

    const login = () => {
        setLoginStatus(true);
        localStorage.setItem('isLoggedIn', true);
    };

    const logout = () => {
        setLoginStatus(false);
        localStorage.setItem('isLoggedIn', false);
    };

    const navClass = pathname => location.pathname === pathname ? ' active' : '';

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg bg-white shadow">
                <div className="container">
                    <Link className="navbar-brand" to="/">MERN CHAT</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarMain">
                        <ul className="nav nav-pills flex-column flex-lg-row mt-2 mt-lg-0">
                            {isLoggedIn && <>
                            <li className="nav-item">
                                <Link className={"nav-link" + navClass("/")} to="/">Home</Link>
                            </li>
                            <li className="nav-item ms-lg-3">
                                <button className="btn nav-link" onClick={logout}>Sign out</button>
                            </li>
                            </>}
                            {!isLoggedIn && <>
                            <li className="nav-item ms-lg-3">
                                <Link className={"nav-link" + navClass("/sign-up")} to="/sign-up">Sign Up</Link>
                            </li>
                            <li className="nav-item ms-lg-3">
                                <Link className={"nav-link" + navClass("/sign-in")} to="/sign-in">Sign In</Link>
                            </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>

            <Context.Provider value={{ isLoggedIn, login, logout }} >
                <Outlet />
            </Context.Provider>
        </div>
    );
}

export default App;