import {AuthServiceInterface} from "./interfaces";
import {Client} from "../FetchClient/Client";
import {
    PEOPLE,
    SERVER,
    PLANETS,
    STARSHIPS,
    FILMS,
    SPECIES,
    VEHICLES,
    FILTERPEOPLE, FILTERPLANETS, FILTERSTARSHIPS, FILTERFILMS, FILTERSPECIES, FILTERVEHICLES
} from "../constants";
import {v4} from "uuid";

export interface User {
    "name": string,
    "height": string,
    "mass": string,
    "hair_color": string,
    "skin_color": string,
    "eye_color": string,
    "birth_year": string,
    "gender": string,
    "homeworld": string,
    "films": string[],
    "species": string[],
    "vehicles": string[],
    "starships": string[],
    "created": string
    "edited": string
    "url": string
}

export interface Planet {
    "name": string,
    "rotation_period": string,
    "orbital_period": string,
    "diameter": string,
    "climate": string,
    "gravity": string,
    "terrain": string,
    "surface_water": string,
    "population": string,
    "residents": string[],
    "films": string[],
    "created": string,
    "edited": string,
    "url": string,
}

export interface Starship {
    "name": string,
    "model": string,
    "manufacturer": string,
    "cost_in_credits": string,
    "length": string,
    "max_atmosphering_speed": string,
    "crew": string,
    "passengers": string,
    "cargo_capacity": string,
    "consumables": string,
    "hyperdrive_rating": string,
    "MGLT": string,
    "starship_class": string,
    "pilots": string[],
    "films": string[],
    "created": string,
    "edited": string,
    "url": string,
}

export interface Film {
    "title": string,
    "episode_id": number,
    "opening_crawl": string,
    "director": string,
    "producer": string,
    "release_date": string,
}

export interface Specie {
    "name": string,
    "classification": string,
    "designation": string,
    "average_height": string,
    "skin_colors": string,
    "hair_colors": string,
    "eye_colors": string,
    "average_lifespan": string,
    "homeworld": string,
    "language": string,
}

export interface Vehicle {
    "name": string,
    "model": string,
    "manufacturer": string,
    "cost_in_credits": string,
    "length": string,
    "max_atmosphering_speed": string,
    "crew": string,
    "passengers": string,
    "cargo_capacity": string,
    "consumables": string,
    "vehicle_class": string,
}

export interface LogInParams {
    password: string,
    login: string
}

/**
 * Сервис загрузки информации об аккаунтах пользователей
 */
export class AuthService implements AuthServiceInterface {
    private readonly client: Client;

    /**
     * Конструктор сервиса
     *
     * @param token
     */
    constructor(token?: string) {
        this.client = new Client;
    }

    /**
     * Загрузка аккаунтов пользователей
     */
    async LogIn(data: LogInParams): Promise<string> {
        try {
            return v4();
        } catch (err) {

            throw err;
        }
    }

    async People(searchValue: string): Promise<User[]> {
        try {

            let url = `${SERVER}${PEOPLE}${searchValue}`;
            if (searchValue !== '')
                url = `${SERVER}${FILTERPEOPLE}${searchValue}`;

            return await this.client.Get<User[]>(url, {})
        } catch (err) {

            throw err;
        }
    }

    async Planets(searchValue: string): Promise<Planet[]> {
        try {

            let url = `${SERVER}${PLANETS}${searchValue}`;
            if (searchValue !== '')
                url = `${SERVER}${FILTERPLANETS}${searchValue}`;

            return await this.client.Get<Planet[]>(url, {})
        } catch (err) {

            throw err;
        }
    }

    async Starships(searchValue: string): Promise<Starship[]> {
        try {

            let url = `${SERVER}${STARSHIPS}${searchValue}`;
            if (searchValue !== '')
                url = `${SERVER}${FILTERSTARSHIPS}${searchValue}`;

            return await this.client.Get<Starship[]>(url, {})
        } catch (err) {

            throw err;
        }
    }

    async Films(searchValue: string): Promise<Film[]> {
        try {

            let url = `${SERVER}${FILMS}${searchValue}`;
            if (searchValue !== '')
                url = `${SERVER}${FILTERFILMS}${searchValue}`;

            return await this.client.Get<Film[]>(url, {})
        } catch (err) {

            throw err;
        }
    }

    async Species(searchValue: string): Promise<Specie[]> {
        try {

            let url = `${SERVER}${SPECIES}${searchValue}`;
            if (searchValue !== '')
                url = `${SERVER}${FILTERSPECIES}${searchValue}`;

            return await this.client.Get<Specie[]>(url, {})
        } catch (err) {

            throw err;
        }
    }

    async Vehicles(searchValue: string): Promise<Vehicle[]> {
        try {

            let url = `${SERVER}${VEHICLES}${searchValue}`;
            if (searchValue !== '')
                url = `${SERVER}${FILTERVEHICLES}${searchValue}`;

            return await this.client.Get<Vehicle[]>(url, {})
        } catch (err) {

            throw err;
        }
    }
}
