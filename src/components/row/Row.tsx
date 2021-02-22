import react, { useEffect, useState } from 'react';
import instance from '../../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Row.css';

interface rowProps {
    title: string;
    fetchURL: string;
    isLargeRow?: boolean;
}

const poster_base_url = 'https://image.tmdb.org/t/p/original/';

const Row = (props: rowProps) => {
    const [movies, setMovies] = useState<[]>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>('');

    // Runs on a specific condition
    useEffect(() => {
        async function fetchData() {
            // Running Axios fetch
            const request = await instance.get(props.fetchURL);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [props.fetchURL]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    };

    const handleClick = (movie: any) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
            .then((url: string) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error: any) => {
                console.log(error);
            });
        }
    };

    return (
        <div className="row">
            {/** Row Title */}
            <h2>{props.title}</h2>
            
            {/** Row Posters */}
            <div className="row__posters">
                {movies.map((movie: any) => (
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}    
                        src={`${poster_base_url}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} 
                    />
                ))}
            </div>

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

        </div>
    )
};

export default Row;