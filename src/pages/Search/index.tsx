import {Accordion, Button, Form, Spinner} from "react-bootstrap";
import './Search.css'
import {
    AvailableTypesEntities,
    InitSearchContextSubscriber,
    SearchItemContext,
    useSearch
} from "../../contexts/withSearch";
import {useEffect} from "react";
import SearchItem from "./components/SearchItem/SearchItem";
import {useAuthorization} from "../../contexts/withAuthorization";
import Cookies from "universal-cookie";

const Search = () => {

    const {searchState, searchAction} = useSearch()
    const {searchValue, searchData, isLoading} = searchState
    const {handleChangeSearchField} = searchAction

    const {authAction, authState} = useAuthorization()
    const {handleChangeLoginField} = authAction

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

    const exit = () => {
        const cookies = new Cookies();
        handleChangeLoginField('token', '')
        handleChangeLoginField('login', '')
        cookies.set('TOKEN', '', {path: '/'});
        cookies.set('NAME', '', {path: '/'});
    }

    return (
        <div className={'search'}>
            <div className={'content-wrapper'}>
                <div className={'wrapper-header'}>
                    <div>{authState.login}</div>
                    <Button onClick={exit}>Exit</Button>
                </div>
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
                {isLoading && (
                    <div className={'search-list'}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search
// https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd
