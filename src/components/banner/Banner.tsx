import react, { useEffect, useState } from 'react';
import instance from '../../axios';
import requests from '../../requests';
import './Banner.css';

const poster_base_url = 'https://image.tmdb.org/t/p/original/';

const Banner: React.FC<{}> = () => {
    const [movie, setMovie] = useState<any>([]);

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(requests.fetchNetflixOriginals);

            /** Randomize Banner movie selection */
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
        }

        fetchData();
    }, []);

    // Function to Truncate Show Description
    function truncate(str: string, n: number) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${poster_base_url}${movie?.backdrop_path})`,
                backgroundPosition: "center"
            }}
        >
            <div className="banner__contents">
                {/** Title */}
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                {/** 2-Button Div */}
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                {/** Description */}
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default Banner;