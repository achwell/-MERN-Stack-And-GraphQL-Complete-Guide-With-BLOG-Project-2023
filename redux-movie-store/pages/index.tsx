import {useState} from 'react';
import type {NextPage} from 'next'
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import {AddShoppingCart, Favorite, FavoriteBorder, RemoveShoppingCart} from "@mui/icons-material";
import {addMovie, addToBasket, addToLikeMovies} from "../store"

interface RootState {
    movies: {
        title: string
        liked: boolean
        inBasket: boolean
    }[]
    basket: string[]
    likedMovies: string[]
}


const Home: NextPage = () => {

    const [movieTitle, setMovieTitle] = useState('');
    const dispatch: Dispatch<any> = useDispatch();
    const movies = useSelector((state: RootState) => state.movies);
    const basket = useSelector((state: RootState) => state.basket);
    const likedMovies = useSelector((state: RootState) => state.likedMovies);

    function handleAddMovie() {
        const newMovie = {
            title: movieTitle.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            inBasket: false,
            liked: false
        };
        dispatch(addMovie(newMovie));
        setMovieTitle('');
    }

    function handleLikeMovie(movieTitle: string) {
        dispatch(addToLikeMovies(movieTitle));
    }

    function handleAddToBasket(movieTitle: string) {
        dispatch(addToBasket(movieTitle));
    }

    return (
        <div className="container">
            <h1 className="title">My Movie List</h1>
            <div className="add-movie">
                <TextField
                    placeholder="Enter a movie title"
                    value={movieTitle}
                    onChange={(e) => setMovieTitle(e.target.value)}
                    className="input"
                />
                <Button onClick={handleAddMovie} className="button" variant="contained" color="primary">
                    Add Movie
                </Button>
            </div>
            <h2 className="subtitle">My Movies</h2>
            <div className="movie-list">
                {movies.map((movie, index) => (
                    <Card key={index} className="movie-card">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {movie.title}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={movie.liked ? <Favorite/> : <FavoriteBorder/>}
                                onClick={() => handleLikeMovie(movie.title)}
                                className="like-button"
                            >
                                {movie.liked ? 'Liked' : 'Not Liked'}
                            </Button>
                            <Button
                                startIcon={movie.inBasket ? <RemoveShoppingCart/> : <AddShoppingCart/>}
                                onClick={() => handleAddToBasket(movie.title)}
                                className="basket-button"
                            >
                                {movie.inBasket ? 'Remove from basket' : 'Add to basket'}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
            <h2 className="subtitle">My Basket ({basket.length})</h2>
            <ul className="basket">
                {basket.map((movie, index) => (
                    <li key={index}>{movie}</li>
                ))}
            </ul>
            <h2 className="subtitle">Liked Movies ({likedMovies.length})</h2>
            <ul className="liked-movies">
                {likedMovies.map((movie, index) => (
                    <li key={index}>{movie}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
