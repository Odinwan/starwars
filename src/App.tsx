import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LogIn from "./pages/LogIn";
import Search from "./pages/Search";
import {useCookies} from "react-cookie";
import {useAuthorization} from "./contexts/withAuthorization";
import Cookies from "universal-cookie";

function App() {
    const cookies = new Cookies();
    const cookieToken = cookies.get('TOKEN')
    const cookieName = cookies.get('NAME')

    const {authState, authAction} = useAuthorization()
    const {token} = authState
    const {handleChangeLoginField} = authAction

    useEffect(() => {
        if (cookieToken !== '') {
            handleChangeLoginField('token', cookieToken)
            handleChangeLoginField('login', cookieName)
        }
    }, [])

    if (token === '' || cookieToken === '') {
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
