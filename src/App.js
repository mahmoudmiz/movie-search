import { CssBaseline, Container, Typography } from '@mui/material';
import MovieSearch from "./components/MovieSearch/MovieSearch";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <div
        style={{
          backgroundColor: '#141414',
          minHeight: '100vh',
          color: '#fff',
          padding: '20px',
        }}
      >
        <Container>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}
          >
            Movie Search
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ textAlign: 'center', marginBottom: '20px', color: '#bbb' }}
          >
            Search for your favorite movies and get details such as posters, titles, and release years.
          </Typography>
          <MovieSearch />
        </Container>
      </div>
    </div>
  );
}

export default App;
