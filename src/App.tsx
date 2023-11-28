import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import "semantic-ui-css/semantic.min.css";
import Navbar from "./components/Navbar";
import { Auth } from "./pages/auth/Auth";
import Movies from "./pages/movie/Movies";
import TvShows from "./pages/tv shows/TvShows";
import Rated from "./pages/rated/Rated";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/rate" element={<Rated/>} />
        <Route path="/movies/:id" element={<Movies />} />
        <Route path="/tvshow/:id" element={<TvShows />} />
      </Routes>
    </>
  );
}

export default App;
