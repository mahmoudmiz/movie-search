// src/components/MovieCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

// Base URL for movie poster images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
// Placeholder image URL
const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/500x750?text=No+Image'

const MovieCard = ({ movie }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#181818',
        color: '#fff',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
        },
      }}
    >
       <CardMedia
        component="img"
        sx={{
          height: '300px', 
          objectFit: 'cover',
        }}
        image={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : PLACEHOLDER_IMAGE_URL} 
        alt={movie.title}
      />
     
      <CardContent
        sx={{
          backgroundColor: '#181818',
          padding: '10px',
          textAlign: 'center',
          height:'100%'
        }}
      >
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
          gutterBottom
        >
          {movie.title}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.8rem',
            color: '#bbb',
          }}
        >
          {new Date(movie.release_date).getFullYear()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
