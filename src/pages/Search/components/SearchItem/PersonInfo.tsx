import {User} from "../../../../services/AuthService/AccountInfoService";

interface PersonInfoProps<T> {
    person: T
}

function PersonInfo<T extends User>(props: PersonInfoProps<T>) {

    const {gender, height, mass, hair_color, eye_color, birth_year, skin_color} = props.person

    return (
        <>
            <div><b>Gender</b> : {gender}</div>
            <div><b>Height</b> : {height}</div>
            <div><b>Mass</b> : {mass}</div>
            <div><b>Hair Color</b> : {hair_color}</div>
            <div><b>Skin Color</b> : {skin_color}</div>
            <div><b>Eye Color</b> : {eye_color}</div>
            <div><b>Birth Day</b> : {birth_year}</div>
        </>
    )
}

export default PersonInfo
