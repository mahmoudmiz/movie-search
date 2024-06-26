import { Typography } from "@mui/material";
import MovieSearch from "./components/MovieSearch/MovieSearch";

function App() {
  return (
    <div className="App">
      <Typography  padding={2} align="center" variant="h4">Movie Search App</Typography>
      <MovieSearch/>
    </div>
  );
}

export default App;
