// Базовый интерфейс коллекции
import { AxiosResponse } from 'axios';

export interface Collection<T> {
    [item: string]: T;
}

/**
 * Интерфейс GraphQL клиента
 */
export interface FetchClient {
    // Выполняет запрос к серверу и возвращает результат
    Post<V, Response>(url: string, data: V, headers: Collection<string>): Promise<AxiosResponse<Response>>;

    // Выполняет запрос изменения к серверу и возвращает результат
    Get<Response>(url: string, headers: Collection<string>): Promise<AxiosResponse<Response>>;
}
