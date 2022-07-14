import {Planet} from "../../../../services/AuthService/AccountInfoService";

interface PlanetInfoProps<T> {
    planet: T
}

function PlanetInfo<T extends Planet>(props: PlanetInfoProps<T>) {

    const {name, rotation_period, orbital_period, diameter, climate, gravity, terrain} = props.planet

    return (
        <>
            <div><b>Name</b> : {name}</div>
            <div><b>Rotation period</b> : {rotation_period}</div>
            <div><b>Orbital period</b> : {orbital_period}</div>
            <div><b>Diameter</b> : {diameter}</div>
            <div><b>Climate</b> : {climate}</div>
            <div><b>Gravity</b> : {gravity}</div>
            <div><b>Terrain</b> : {terrain}</div>
        </>
    )
}

export default PlanetInfo
