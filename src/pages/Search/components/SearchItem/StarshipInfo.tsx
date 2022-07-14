import {Starship} from "../../../../services/AuthService/AccountInfoService";

interface StarshipInfoProps<T> {
    starship: T
}

function StarshipInfo<T extends Starship>(props: StarshipInfoProps<T>) {

    const {name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew} = props.starship

    return (
        <>
            <div><b>Name</b> : {name}</div>
            <div><b>Model</b> : {model}</div>
            <div><b>Manufacturer</b> : {manufacturer}</div>
            <div><b>Cost in credits</b> : {cost_in_credits}</div>
            <div><b>Crew</b> : {crew}</div>
            <div><b>Length</b> : {length}</div>
            <div><b>Max atmosphering speed</b> : {max_atmosphering_speed}</div>
        </>
    )
}

export default StarshipInfo
