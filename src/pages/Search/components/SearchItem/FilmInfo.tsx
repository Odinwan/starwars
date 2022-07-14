import {Film} from "../../../../services/AuthService/AccountInfoService";

interface FilmInfoProps<T> {
    film: T
}

function FilmInfo<T extends Film>(props: FilmInfoProps<T>) {

    const {title, episode_id, opening_crawl, director, producer, release_date} = props.film

    return (
        <>
            <div><b>title</b> : {title}</div>
            <div><b>Episode Id</b> : {episode_id}</div>
            <div><b>Opening Crawl</b> : {opening_crawl}</div>
            <div><b>Director</b> : {director}</div>
            <div><b>Producer</b> : {producer}</div>
            <div><b>Release date</b> : {release_date}</div>
        </>
    )
}

export default FilmInfo
