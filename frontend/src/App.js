import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './assets/fontawesome'; 
import HomePage from './pages/HomePage';
import Booking from "./pages/Booking";
import Rooms from "./pages/Rooms";
import About from "./pages/Experiences";
import PNF from "./pages/PNF";
import Reservations from "./pages/Reservation";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/reservation" element={<Reservations />} />
          <Route path="/experiences" element={<About />} />
          <Route path="*" element={<PNF />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
