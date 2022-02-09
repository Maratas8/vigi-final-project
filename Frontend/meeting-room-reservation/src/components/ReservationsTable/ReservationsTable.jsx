import React, { useState, useEffect } from "react";
import './ReservationsTable.css';

const ReservationsTable = () => {
  const now = new Date().toISOString();
  let tbl = "";

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/reservations')
      .then(response => response.json())
      .then(data => setReservations(data));
  }, [])

  return (

    <div className="table">
      <h1>Rooms reservations</h1>
      {reservations.length > 0 ?
        <table>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Reserved By</th>
              <th>From</th>
              <th>To</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => {
              
              if (now > new Date(reservation.reserved_to).toISOString()) {
                tbl =
                <tr key={reservation.id} className="past">
                  <td>{reservation.name}</td>
                  <td>{reservation.fullname}</td>
                  <td>{new Date(reservation.reserved_from).toLocaleString('lt-LT')}</td>
                  <td>{new Date(reservation.reserved_to).toLocaleString('lt-LT')}</td>
                  <td>{reservation.comment}</td>
                </tr>
                
               } else {
                 tbl =
                <tr key={reservation.id} className="actual">
                  <td>{reservation.name}</td>
                  <td>{reservation.fullname}</td>
                  <td>{new Date(reservation.reserved_from).toLocaleString('lt-LT')}</td>
                  <td>{new Date(reservation.reserved_to).toLocaleString('lt-LT')}</td>
                  <td>{reservation.comment}</td>
                </tr>
              }
              return (tbl);

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

export default ReservationsTable;