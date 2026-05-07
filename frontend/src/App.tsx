import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllMovies from './components/AllMovies'
import AddMovie from './components/AddMovie'
import SearchMovie from './components/SearchMovie'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllMovies />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/search-movie" element={<SearchMovie />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
