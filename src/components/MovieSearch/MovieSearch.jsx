// src/components/MovieSearch.js
import React, { useState, useEffect } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import {
  TextField,
  CircularProgress,
  Grid,
  Typography,
  Container,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import MovieCard from "./MovieCard";
import useDebounce from "../../hooks/useDebounce";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

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
    <Container>
      <TextField
        label="Search for a movie..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete='off'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#fff" }} />
            </InputAdornment>
          ),
          style: {
            color: "#fff",
          },
        }}
        InputLabelProps={{
          style: {
            color: "#bbb",
          }
        }}
        sx={{
          width: "100%",
          backgroundColor: "#333",
          borderRadius: "4px",
          marginBottom: "2rem",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#e50914",
            },
            "&:hover fieldset": {
              borderColor: "#e50914",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#e50914",
            },
          },
        }}
      />

      {loading && <CircularProgress color="inherit" />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && !movies?.length && query && (
        <Typography
          variant="h5"
          color="error"
          align="center"
          style={{ margin: "2rem 0" }}
        >
          No movies found for <strong>{query}</strong>.
        </Typography>
      )}
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
