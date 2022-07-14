import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LogIn from "./pages/LogIn";
import Search from "./pages/Search";
import {useCookies} from "react-cookie";
import {useAuthorization} from "./contexts/withAuthorization";

function App() {
    const [_cookieToken, setCookieToken] = useCookies(["TOKEN"]);
    const {authState, authAction} = useAuthorization()
    const {token} = authState
    const {handleChangeLoginField} = authAction

    useEffect(() => {
        handleChangeLoginField('token', '')
        setCookieToken("TOKEN", "", {path: '/'})
    }, [])

    if (token === '') {
        return (
            <Routes>
                <Route path="/" element={<LogIn/>}/>
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Search/>}/>
        </Routes>
    );
}

export default App;
