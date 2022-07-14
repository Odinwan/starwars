import {BehaviorSubject, combineLatest, debounceTime, filter, map, OperatorFunction, switchMap, tap} from "rxjs";
import {useEffect, useState} from "react";
import {authService} from "../services/AuthService";
import {
    Film,
    Planet,
    Specie,
    Starship,
    User,
    Vehicle
} from "../services/AuthService/AccountInfoService";

interface SearchInterface {
    searchValue: string,
    isLoading: boolean,
    searchData: SearchData
}

class AuthorizationContext implements SearchInterface {
    searchValue: string = ''
    isLoading: boolean = false
    searchData: SearchData = []
}

export type AvailableTypesEntities = Planet | User | Starship | Specie | Film | Vehicle

export interface SearchItemContext<T> {
    name: string
    type: keyof typeof Types,
    entity: T
}

type SearchData = SearchItemContext<AvailableTypesEntities>[]

const getData$ = new BehaviorSubject<boolean>(false);
const isLoading$ = new BehaviorSubject<boolean>(false);

enum Types {
    people = 'people',
    planet = 'planet',
    starship = "starship",
    specie = "specie",
    vehicle = "vehicle",
    film = "film",
}

/**
 * Шина сохранения данных на сервере
 */
const getAllData$ = getData$.pipe(
    filter(value => value),
    debounceTime(500),
    tap(() => isLoading$.next(true)),
    switchMap(handleLoadAllEntities),
    tap(() => isLoading$.next(false))
);

async function handleLoadAllEntities() {
    const searchValue = context$.getValue().searchValue

    const [people, planets, starships, vehicles, species, films] = await Promise.all([
        authService().People(searchValue),
        authService().Planets(searchValue),
        authService().Starships(searchValue),
        authService().Vehicles(searchValue),
        authService().Species(searchValue),
        authService().Films(searchValue),
    ]);

    const preData: SearchData = [
        ...people.map((person) => (
            {
                name: person.name,
                type: Types.people,
                entity: person
            }
        )),
        ...planets.map((planet) => (
            {
                name: planet.name,
                type: Types.planet,
                entity: planet
            }
        )),
        ...starships.map((starship) => (
            {
                name: starship.name,
                type: Types.starship,
                entity: starship
            }
        )),
        ...vehicles.map((vehicle) => (
            {
                name: vehicle.name,
                type: Types.vehicle,
                entity: vehicle
            }
        )),
        ...species.map((specie) => (
            {
                name: specie.name,
                type: Types.specie,
                entity: specie
            }
        )),
        ...films.map((film) => (
            {
                name: film.title,
                type: Types.film,
                entity: film
            }
        ))
    ]

    return preData;
}

const handleChangeSearchField = (value: string): void => {
    const contextValue = context$.getValue();

    context$.next({
        ...contextValue,
        searchValue: value,
        searchData: []
    })

    getData$.next(true)
};

type SearchActions = {
    handleChangeSearchField: (value: string) => void
}

const actions: SearchActions = {
    handleChangeSearchField,
}

const context$ = new BehaviorSubject<SearchInterface>(new AuthorizationContext);

export type WithSearchData = {
    searchState: SearchInterface,
    searchAction: SearchActions
}


/**
 * Инициализация работы контекста
 */
export const InitSearchContextSubscriber = () => {
    const subscriber = combineLatest([
        isLoading$,
    ])
        .pipe(
            map(([isLoading]) => ({
                ...context$.getValue(),
                isLoading
            } as SearchInterface))
        )
        .subscribe({
            next: value => context$.next(value),
        });

    subscriber.add(
        getAllData$.subscribe({
            next: value => {
                context$.next({
                    ...context$.getValue(),
                    searchData: value
                })
                getData$.next(false)
            },
        })
    )

    getData$.next(true)

    return () => subscriber.unsubscribe();
};

export const useSearch = (...pipeModifications: OperatorFunction<any, SearchInterface>[]): WithSearchData => {
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
        searchState: contextValue,
        searchAction: actions
    }
}
