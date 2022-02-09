import './App.css';
import { Routes, Route } from 'react-router';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Reservations from './pages/Reservations/Reservations';
import AddReservation from './pages/AddReservation/AddReservation';
import Room from './pages/Room/Room';
import AddRoom from './pages/AddRoom/AddRoom';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/add-reservation" element={<AddReservation />} />
        <Route path="/rooms/:roomId" element={<Room />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
