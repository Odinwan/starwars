import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LogIn from "./pages/LogIn";
import Search from "./pages/Search";
import {useCookies} from "react-cookie";
import {useAuthorization} from "./contexts/withAuthorization";

function App() {
    const [cookieToken] = useCookies(["TOKEN","NAME"]);
    const {authState, authAction} = useAuthorization()
    const {token} = authState
    const {handleChangeLoginField} = authAction

    useEffect(() => {
        if (cookieToken.TOKEN !== '') {
            handleChangeLoginField('token', cookieToken.TOKEN)
            handleChangeLoginField('login', cookieToken.NAME)
        }
    }, [])

    if (token === '' || cookieToken.TOKEN === '') {
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
