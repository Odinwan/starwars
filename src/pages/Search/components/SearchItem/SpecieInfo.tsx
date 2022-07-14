import {Specie} from "../../../../services/AuthService/AccountInfoService";

interface SpecieInfoProps<T> {
    specie: T
}

function SpecieInfo<T extends Specie>(props: SpecieInfoProps<T>) {

    const {
        name,
        classification,
        designation,
        average_height,
        skin_colors,
        hair_colors,
        eye_colors,
        average_lifespan,
        homeworld,
        language
    } = props.specie

    return (
        <>
            <div><b>Name</b> : {name}</div>
            <div><b>Classification</b> : {classification}</div>
            <div><b>Designation</b> : {designation}</div>
            <div><b>Average Height</b> : {average_height}</div>
            <div><b>Skin Colors</b> : {skin_colors}</div>
            <div><b>Hair Colors</b> : {hair_colors}</div>
            <div><b>Eye Colors</b> : {eye_colors}</div>
            <div><b>Averag Lifespan</b> : {average_lifespan}</div>
            <div><b>Homeworld</b> : {homeworld}</div>
            <div><b>Language</b> : {language}</div>
        </>
    )
}

export default SpecieInfo
