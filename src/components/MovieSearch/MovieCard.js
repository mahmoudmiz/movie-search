// src/components/MovieCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const MovieCard = ({ movie }) => {
  return (
    <Card sx={{height:'100%'}}>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {movie.release_date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
