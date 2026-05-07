const express = require("express")
const Router = express.Router()
const Movie = require("../models/movies")

Router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
        res.status(200).json({ message: "Movies fetched successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

Router.post("/", async (req, res) => {
    const { title, description, genre } = req.body
    const movie = new Movie({ title, description, genre })
    await movie.save()
    res.json(movie)
})

Router.delete("/:id", async (req,res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id)
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        res.json({ message: "Movie deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

Router.get("/search/:title", async (req, res) => {
    try{
        const searchMovies = await Movie.find({ title: { $regex: req.params.title, $options: "i" } })
        if (searchMovies.length === 0) {
            return res.status(404).json({ message: "No movies found" })
        }
        res.json(searchMovies)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = Router