import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function AddMovie() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const trimmedTitle = title.trim()
        const trimmedDescription = description.trim()
        const trimmedGenre = genre.trim()

        // Basic validation
        if (!trimmedTitle || !trimmedDescription || !trimmedGenre) {
            alert('Please fill in title, description and genre')
            return
        }

        const newMovie = {
            title: trimmedTitle,
            description: trimmedDescription,
            genre: trimmedGenre
        }

        try {
            const response = await fetch('http://localhost:3000/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMovie)
            })

            if (!response.ok) {
                throw new Error('Failed to add movie')
            }

            await response.json()

            setTitle('')
            setDescription('')
            setGenre('')
            alert('Movie added successfully')
        } catch (error) {
            console.error('Error:', error)
            alert('Something went wrong while adding the movie')
        }
    }
    return (
        <div>
            <h1>Add Movie</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                <button type="submit">Add Movie</button>
                <button type="button" onClick={() => navigate('/')}>Back to All Movies</button>
            </form>
        </div>
    )
}

export default AddMovie