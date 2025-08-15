import "../src/css/App.css";
import Home from "./pages/Home";
import Checks from "./pages/Checks";
import Navbar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  return (
    <MovieProvider>
      <div className="website">
        <Navbar />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checks" element={<Checks />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
