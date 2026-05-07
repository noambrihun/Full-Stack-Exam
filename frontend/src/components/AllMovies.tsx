import { useState, useEffect } from 'react'
import { type Movie } from '../types/movie.ts'

function AllMovies() {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/api/movies')
        .then(response => response.json())
        .then(data => setMovies(data))
    }, [])
    return <div>
        <h1>All Movies</h1>
        <div className="grid grid-cols-3 gap-4">
            {movies.map((movie) => (
                <div key={movie.title}>
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                    <p>{movie.genre}</p>
                </div>
            ))}
        </div>
    </div>
}

export default AllMovies