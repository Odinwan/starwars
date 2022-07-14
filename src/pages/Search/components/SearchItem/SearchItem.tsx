import {Accordion} from "react-bootstrap";
import {SearchItemContext} from "../../../../contexts/withSearch";
import StarshipInfo from "./StarshipInfo";
import PersonInfo from "./PersonInfo";
import PlanetInfo from "./Planet";
import SpecieInfo from "./SpecieInfo";
import FilmInfo from "./FilmInfo";
import VehicleInfo from "./VehicleInfo";

interface SearchItemProps {
    searchItem: SearchItemContext<any>
    index: number
    searchValue: string
}

// Заменяет oldS на newS в строке fullS
function replaceString(oldS: string, newS: string, fullS: string) {
    let div
    for (let i = 0; i < fullS.length; ++i) {
        if (fullS.substring(i, i + oldS.length) == oldS.toLowerCase()) {
            fullS = fullS.substring(0, i) + oldS + fullS.substring(i + oldS.length, fullS.length);
            div = (
                <div>{fullS.substring(0, i)}
                    <b>{newS}</b>{fullS.substring(i + oldS.length, fullS.length)}
                </div>
            )
        }
    }
    return div;
}

const SearchItem = (props: SearchItemProps) => {

    const {searchItem, searchValue, index} = props

    return (
        <Accordion.Item eventKey={`${index}`}>
            <Accordion.Header>
                <div className={'header-accordion'}>
                    <div>{replaceString(searchValue.toLowerCase(), searchValue.toLowerCase(), searchItem.name.toLowerCase())}</div>
                    <div>{searchItem.type}</div>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                {searchItem.type === 'people' && <PersonInfo person={searchItem.entity}/>}
                {searchItem.type === 'starship' && <StarshipInfo starship={searchItem.entity}/>}
                {searchItem.type === 'planet' && <PlanetInfo planet={searchItem.entity}/>}
                {searchItem.type === 'specie' && <SpecieInfo specie={searchItem.entity}/>}
                {searchItem.type === 'film' && <FilmInfo film={searchItem.entity}/>}
                {searchItem.type === 'vehicle' && <VehicleInfo vehicle={searchItem.entity}/>}
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default SearchItem
// https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd
