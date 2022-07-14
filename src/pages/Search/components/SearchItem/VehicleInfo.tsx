import {Vehicle} from "../../../../services/AuthService/AccountInfoService";

interface VehicleInfoProps<T> {
    vehicle: T
}

function VehicleInfo<T extends Vehicle>(props: VehicleInfoProps<T>) {

    const {
        name,
        model,
        manufacturer,
        cost_in_credits,
        length,
        max_atmosphering_speed,
        crew,
        passengers,
        cargo_capacity,
        consumables,
        vehicle_class
    } = props.vehicle

    return (
        <>
            <div><b>Name</b> : {name}</div>
            <div><b>Model</b> : {model}</div>
            <div><b>Manufacturer</b> : {manufacturer}</div>
            <div><b>Cost In Credits</b> : {cost_in_credits}</div>
            <div><b>Length</b> : {length}</div>
            <div><b>Crew</b> : {crew}</div>
            <div><b>Max Atmosphering Speed</b> : {max_atmosphering_speed}</div>
            <div><b>Passengers</b> : {passengers}</div>
            <div><b>Cargo Capacity</b> : {cargo_capacity}</div>
            <div><b>Consumables</b> : {consumables}</div>
            <div><b>Vehicle Class</b> : {vehicle_class}</div>
        </>
    )
}

export default VehicleInfo
