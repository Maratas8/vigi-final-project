import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Room.css';
import yes from '../../images/yes.png';
import no from '../../images/no.png';
import Button from '../../components/Button/Button';

const Room = () => {
  let now = new Date().toISOString();
  now = now.substring(0, 16);  

  const options = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  
    fetch(`http://localhost:3001/rooms/${roomId}`, options)
      .then(response => response.json())
      .then(data => setRoom(data[0]));
 
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const reservation = {
      roomId: event.target.roomId.value,
      reservedFrom: new Date(event.target.reservedFrom.value),
      reservedTo: new Date(event.target.reservedTo.value),
      comment: event.target.comment.value
    }; 

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(reservation),
    };

    fetch('http://localhost:3001/reservations', options)
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }

        return response.json();
      })
      .then(data => {
        alert("Room reserved");
      })
  }

  return (
    <div id="room">
      <div id="room-data">
        <h3>Room Name: {room.name} </h3>
        <h5>Floor: {room.floor_number}</h5>
        <h5>Room Size: {room.size} m<sup>2</sup></h5>
        <h5>Seats: {room.seats}</h5>
        <h5>Projector: {room.has_projector ? <img src={yes} alt="yes" /> : <img src={no} alt="no" />}</h5>
        <h5>TV: {room.has_tv ? <img src={yes} alt="yes" /> : <img src={no} alt="no" />}</h5>

        <form onSubmit={onSubmitHandler}>
          <input name="roomId" type="number" value={room.id} hidden />
          <input name="reservedFrom" type="datetime-local" min={now}/>
          <input name="reservedTo" type="datetime-local" min={now}/>
          <textarea name="comment" placeholder="Comments..." rows="5" cols="80" />
          <Button text="Reserv" className="blue" type="submit" />
        </form>
      </div>

    </div>
  )
}

export default Room;