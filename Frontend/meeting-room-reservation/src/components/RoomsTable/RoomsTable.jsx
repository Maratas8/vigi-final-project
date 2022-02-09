import React, { useState, useEffect } from "react";
import './RoomsTable.css';
import yes from '../../images/yes.png';
import no from '../../images/no.png';
import { useNavigate } from 'react-router-dom';


const RoomsTable = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  let isLoggedIn = localStorage.getItem('token') != null && localStorage.getItem('token').length > 20;

  useEffect(() => {
    fetch('http://localhost:3001/rooms')
      .then(response => response.json())
      .then(data => setRooms(data));
  }, [rooms])

  const onClickHandler = (roomId) => {
    isLoggedIn ? navigate(`/rooms/${roomId}`) : navigate('/login');
  }

  return (
    <div className="table">
      <h1>Select a Room</h1>
      {rooms.length > 0 ?
        <table>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Size m<sup>2</sup></th>
              <th>Seats</th>
              <th>Floor</th>
              <th>Projector</th>
              <th>TV</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => {        
              return (
                <tr key={room.id} onClick={() => {onClickHandler(room.id)}}>
                  <td>{room.name}</td>
                  <td>{room.size}</td>
                  <td>{room.seats}</td>
                  <td>{room.floor_number}</td>
                  <td>{room.has_projector ? <img src={yes} alt="yes" /> : <img src={no} alt="no" />}</td>
                  <td>{room.has_tv ? <img src={yes} alt="yes" /> : <img src={no} alt="no" />}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
        : <div className="loading">
          <img src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="Loading..." />
        </div>
      }

    </div>
  );
}

export default RoomsTable;