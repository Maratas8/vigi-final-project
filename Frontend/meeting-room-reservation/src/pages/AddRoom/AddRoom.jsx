import React from "react";
import Button from '../../components/Button/Button';
import './AddRoom.css';

const AddRoom = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const user = {
      name: event.target.name.value,
      size: Number(event.target.size.value),
      floorNumber: event.target.floor.value,
      seats: Number(event.target.seats.value),
      hasProjector: event.target.projector.checked,
      hasTv: event.target.tv.checked,
    };

    console.log(user);

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(user),
    };

    fetch('http://localhost:3001/rooms', options)
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }
         event.target.name.value = "";
         event.target.size.value = "";
         event.target.floor.value = "";
         event.target.seats.value = "";
         event.target.projector.checked = false;
         event.target.tv.checked = false;
         alert('Room added');
        return response.json();
      })
  };

  return (
    <div id="add-room">
      <h1>Add New Room</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="name" type="text" placeholder="Room name" />
        <input name="size" type="number" placeholder="Room size in square meters" min={1} step="1" />
        <input name="floor" type="text" placeholder="Floor number" />
        <input name="seats" type="number" placeholder="Number of seats" min={1} step="1" />
        <div className="checkbox">
          <label htmlFor="projector">Has projector</label>
          <input name="projector" type="checkbox" />
       
          <label htmlFor="tv">Has TV</label>
          <input name="tv" type="checkbox" />
        </div>
        <Button type="submit" text="Add Room" className="white" />
      </form>
    </div>
  )
}

export default AddRoom;