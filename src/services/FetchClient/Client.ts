import {Collection, FetchClient} from './index';
import axios from 'axios';
import {LOGIN} from "../constants";

export class Client implements FetchClient {

    /**
     * Выполнение запроса к серверу
     *
     * @param url
     * @param headers
     */
    async Get<Response>(url: string, headers: Collection<string>): Promise<Response> {
        const token = await localStorage.getItem('token');
        let commonHeaders: Collection<string> = {
        };

        const logIn = url.includes(LOGIN);
        if (token !== null && !logIn) {
            commonHeaders['Authorization'] = `Bearer ${token}`;
        }

        return axios({
            method: 'GET',
            url,
            headers: commonHeaders,
        })
            .then(response => response)
            .then(json => {

                if (json.data) {
                    return json.data.results;
                }

                return json;
            });
    }


    /**
     * Выполнение запроса к серверу
     *
     * @param url
     * @param data
     * @param headers
     */
    async Post<V, Response>(url: string, data: V, headers: Collection<string>): Promise<Response> {

        const token = await localStorage.getItem('token');
        let commonHeaders: Collection<string> = {
            "Access-Control-Allow-Origin": "http://localhost:3000/",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        };

        const logIn = url.includes(LOGIN);

        if (token !== null && !logIn) {
            commonHeaders['Authorization'] = `Token ${token}`;
        }

        return axios({
            method: 'POST',
            url,
            headers: commonHeaders,
            data: data,
        })
            .then(json => {
                if (json.data) {

                    return json.data;
                }

                return json;
            });
    }
}
