import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import "./style/style.css";
import Main from './components/Main';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
