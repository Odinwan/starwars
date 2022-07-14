import {Accordion, Form, Spinner} from "react-bootstrap";
import './Search.css'
import {
    AvailableTypesEntities,
    InitSearchContextSubscriber,
    SearchItemContext,
    useSearch
} from "../../contexts/withSearch";
import {useEffect} from "react";
import SearchItem from "./components/SearchItem/SearchItem";

const Search = () => {

    const {searchState, searchAction} = useSearch()
    const {searchValue, searchData, isLoading} = searchState
    const {handleChangeSearchField} = searchAction

    useEffect(() => {
        return InitSearchContextSubscriber();
    }, []);

    const searchFilter = (searchElement: SearchItemContext<AvailableTypesEntities>) => {
        if (searchValue === '') {
            return searchElement
        } else {
            if (searchElement.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return searchElement
            }
        }
    }

    const dataToDisplay = searchData.filter(searchFilter)

    return (
        <div className={'search'}>
            <div className={'content-wrapper'}>
                <div className={'search-input'}>
                    <Form.Label htmlFor="search">Search</Form.Label>
                    <Form.Control
                        type="text"
                        id="search"
                        value={searchValue}
                        onChange={(event) => handleChangeSearchField(event.target.value)}
                        aria-describedby="passwordHelpBlock"
                    />
                </div>
                {!isLoading && dataToDisplay.length !== 0 && (
                    <div className={'search-list'}>
                        <Accordion>
                            {dataToDisplay.map((searchElement: SearchItemContext<AvailableTypesEntities>, index: number) => (
                                <SearchItem
                                    searchItem={searchElement}
                                    index={index}
                                    searchValue={searchValue}
                                />
                            ))}
                        </Accordion>
                    </div>
                )}
                {!isLoading && dataToDisplay.length === 0 && (
                    <div className={'search-list'}>
                        Have not data to display
                    </div>
                )}
                {isLoading && <div className={'search-list'}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>}
            </div>
        </div>
    )
}

export default Search
// https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd
