/**
 * Интерфейс сервиса для работы с аккаунтами пользователями
 */
import {Film, LogInParams, Planet, Specie, Starship, User, Vehicle} from './AccountInfoService';


export interface AuthServiceInterface {
  LogIn(data: LogInParams): Promise<string>;

  People(searchValue:string): Promise<User[]>;

  Planets(searchValue:string): Promise<Planet[]>;

  Starships(searchValue:string): Promise<Starship[]>;

  Films(searchValue:string): Promise<Film[]>;

  Species(searchValue:string): Promise<Specie[]>;

  Vehicles(searchValue:string): Promise<Vehicle[]>;
}
