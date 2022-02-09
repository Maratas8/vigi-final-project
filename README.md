# Introduction

This is a final project of full stack course on Code Academy by VIGI-2 group student Marius Atgalainis.

Meeting Room Reservation is an app for making meeting rooms reservations at the office.

### Technologies used
- MySQL
- Node.js
- React.js
- GIT
- Visual Studio Code
- Postman (request collection can be fount at /VIGI-Final-Project/postman_requests and can be imported to Postmam)


### Functions
- Register
- Login
- Logout
- See reservations table (everyone)
- See room table (everyone)
- Resere a room (logged in users)
- Add new room (logged in users)


# Getting Started

### Database setup

- Create tables

CREATE TABLE users(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(255),
    admin BOOL DEFAULT(0)
);

CREATE TABLE rooms(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    size INT,
    floor_number VARCHAR(10),
    seats INT,
    has_projector BOOL,
    has_tv BOOL
);

CREATE TABLE room_reservations(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    room_id INT,
    reservation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    reserved_from DATETIME,
    reserved_to DATETIME,
    comment VARCHAR(1000),
    FOREIGN KEY (user_id) REFERENCES "users"(id),
    FOREIGN KEY (room_id) REFERENCES "rooms"(id)
);


### Backend setup

- Set port to 3001
- Open terminal
- Navigate to /VIGI-Final-Project/Backend
- Execute "npm i"
- Execute "npm run start"


### Frontend setup

- Open terminal
- Navigate to /VIGI-Final-Project/Frontend/meeting-room-reservation
- Execute "npm i"
- Execute "npm run start"