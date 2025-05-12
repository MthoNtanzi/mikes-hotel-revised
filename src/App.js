import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
