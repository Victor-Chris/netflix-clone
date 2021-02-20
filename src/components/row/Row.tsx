import react, { useEffect, useState } from 'react';
import instance from '../../axios';
import './Row.css';

interface rowProps {
    title: string;
    fetchURL: string;
    isLargeRow?: boolean;
}

const poster_base_url = 'https://image.tmdb.org/t/p/original/';

const Row = (props: rowProps) => {
    const [movies, setMovies] = useState<[]>([]);;

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

    return (
        <div className="row">
            {/** Row Title */}
            <h2>{props.title}</h2>
            
            {/** Row Posters */}
            <div className="row__posters">
                {movies.map((movie: any) => (
                    <img 
                        key={movie.id}
                        className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}    
                        src={`${poster_base_url}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} 
                    />
                ))}
            </div>

        </div>
    )
};

export default Row;