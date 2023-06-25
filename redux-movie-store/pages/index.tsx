import {useState} from "react"
import type {NextPage} from 'next'
import {useDispatch, useSelector} from "react-redux"
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {AddShoppingCart, Favorite, FavoriteBorder, RemoveShoppingCart} from "@material-ui/icons";

const Home: NextPage = () => {

    const dispatch = useDispatch()
    const movies = useSelector((state: {
        movies: { title: string; liked: boolean; inBasket: boolean } []
    }) => state.movies)
    const basket = useSelector((state: { basket: string[] }) => state.basket)
    const likedMovies = useSelector((state: { likedMovies: string[] }) => state.likedMovies)

    const [movieTitle, setMovieTitle] = useState("")

    console.log({movies, basket, likedMovies})

    const handleAddMovie = () => {
        const newMovie = {title: movieTitle, liked: false, inBasket: false}
        dispatch({type: "ADD_MOVIE", payload: newMovie})
        setMovieTitle("")
    }

    const handleAddToBasket = (movie: string) => {
        dispatch({type: "ADD_TO_BASKET", payload: movie})
    }

    const handleAddToLikedMovies = (movie: string) => {
        dispatch({type: "ADD_TO_LIKED_MOVIES", payload: movie})
    }
    return (
        <div className="container">
            <div>
                <h1>My Movie List</h1>
            </div>
            <div className="add-movie">
                <input
                    type="text"
                    placeholder="Enter a movie title"
                    value={movieTitle}
                    onChange={(e) => setMovieTitle(e.target.value)}
                />
                <button onClick={handleAddMovie}>Add Movie</button>
            </div>
            <h2>My movies ({movies.length})</h2>
            <ul className="movie-list">
                {movies.map((movie, index) => <Card key={index} className="movie-card">
                    <CardContent>
                        <Typography variant="h5" component="h2">{movie.title}</Typography>
                    </CardContent>
                    <CardActions>
                    <Button
                        startIcon={movie.inBasket ? <RemoveShoppingCart/> : <AddShoppingCart/>}
                        onClick={() => handleAddToBasket(movie.title)}>{movie.inBasket ? "Remove from basket" : "Add to basket"}</Button>
                    <Button
                        startIcon={movie.liked ? <Favorite/> : <FavoriteBorder/>}
                        onClick={() => handleAddToLikedMovies(movie.title)}>{movie.liked ? "Dislike" : "Like"}</Button>
                    </CardActions>
                </Card>)}
            </ul>
            <h2>My Basket ({basket.length})</h2>
            <ul>
                {basket.map((movie, index) => <li key={index}>{movie}</li>)}
            </ul>
            <h2>My liked movies ({likedMovies.length})</h2>
            <ul>
                {likedMovies.map((movie, index) => <li key={index}>{movie}</li>)}
            </ul>

        </div>
    )
}

export default Home
