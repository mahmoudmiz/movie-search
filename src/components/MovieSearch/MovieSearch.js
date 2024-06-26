// src/components/MovieSearch.js
import React, { useState, useEffect } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import {
  TextField,
  CircularProgress,
  Grid,
  Typography,
  Container,
} from "@mui/material";

import MovieCard from "./MovieCard";
import useDebounce from "../../hooks/useDebounce";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const MovieSearch = () => {
  const { movies, setMovies, loading, setLoading, error, setError } =
    useMovieContext();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      return data.results;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const searchMovies = async () => {
      if (debouncedQuery) {
        setLoading(true);
        setError(null);
        try {
          const results = await fetchMovies(debouncedQuery);
          setMovies(results);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setMovies([]);
      }
    };

    searchMovies();
  }, [debouncedQuery, setMovies, setLoading, setError]);

  return (
    <Container sx={{ p: 4 }}>
      <TextField
        label="Search for a movie..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieSearch;
