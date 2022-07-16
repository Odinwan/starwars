import {BehaviorSubject, OperatorFunction} from "rxjs";
import {useEffect, useState} from "react";
import {authService} from "../services/AuthService";
import Cookies from "universal-cookie";

interface AuthorizationInterface {
    login: string,
    password: string,
    token: string,
}

class AuthorizationContext implements AuthorizationInterface {
    login: string = ''
    password: string = ''
    token: string = ''
}

const handleChangeLoginField = <T extends keyof AuthorizationInterface>(field: T, value: AuthorizationInterface[T]): void => {
    const contextValue = context$.getValue();

    context$.next({
        ...contextValue,
        [field]: value,
    })
};

const handleLogin = async () => {
    const contextValue = context$.getValue();
    const {password, login} = contextValue

    if (password === '' || login === '') {
        alert(`
            ${password === '' ? "Введите пароль" : ""}
            ${login === '' ? "Введите login" : ""}
        `)

        return
    }

    const params = {
        password: password,
        login: login
    }

    const token = await authService().LogIn(params)

    if (token) {
        const cookies = new Cookies();
        cookies.set('TOKEN', token, {path: '/'});
        cookies.set('NAME', login, {path: '/'});

        context$.next({
            ...contextValue,
            token: token
        })

        return
    }

}

type AuthorizationActions = {
    handleLogin: () => void
    handleChangeLoginField: <T extends keyof AuthorizationInterface>(field: T, value: AuthorizationInterface[T]) => void
}

const actions: AuthorizationActions = {
    handleLogin,
    handleChangeLoginField,
}

const context$ = new BehaviorSubject<AuthorizationInterface>(new AuthorizationContext);

export type WithAuthorizationData = {
    authState: AuthorizationInterface,
    authAction: AuthorizationActions
}

export const useAuthorization = (...pipeModifications: OperatorFunction<any, AuthorizationInterface>[]): WithAuthorizationData => {
    const [contextValue, setContextValue] = useState(context$.getValue())
    useEffect(() => {
        const subscription = context$
            // @ts-ignore
            .pipe(...pipeModifications)
            .subscribe({
                next: data => setContextValue(data)
            })

        return () => {
            try {
                subscription.unsubscribe()
            } catch (e) {
            }
        }
    }, [])

    return {
        authState: contextValue,
        authAction: actions
    }
}
