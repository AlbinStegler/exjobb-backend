Frontend is here:

# booking-tool

This project is created for my thesis in as my last project as a student on the Web programming course at Blekinge Tekniska Högskola.

# Get Up and running

To run the project download the repo and start the frontend and backend with npm start. Access the frontend on port 3000 and backend on 1337.

# Notes

This part is for notes to make sure that i wont miss anything during the writing process in my thesis. I will document the paths im taking and motivate why they were taken.

## React 

I will be using React for this project as it is a framework that has got a good amount of base functionality that will be needed for this project. (State management, Routing, Component based)

## Express

As Express is an easy to use basic framework. I will use this to run the backend and create a REST API that will communicate with the frontend.

## MongoDB with Mongoose

I will for this project be using a MongoDB database. This is beacause I'm not sure of the structure yet and MongoDB is an easy to use database that uses objectstyle data. To create my Schemas for the database i will be using the Mongoose library to structure the data once im satisfyed with the layout of it.

## Up N RunniN
### Front and Backend
Once i got started i created a basic groundwork for the frontend and backend. I created backend routes for the api to create events and users. After that was done i proceded with creating a event editing page on the frontend. The page is responsive in the way that you can add rows of tables and the amount of columns as you wish. When the event is the layout you like you can create a event to add it to the database.

### Admin view
I decided to create a admin view. To access it you have to login. From this page you can create new events and se all of the users and events created and where they are going to sit. The page handles a check to check if the user actually is logged in and the database is responsible to check that the username and password is a match.


### Manage events and add users to seats
Users can now book a seat. When booking checks that the seat is free before booking. If the seat is booked no user is created. From the adminpage when a user is removed the seat is unbooked from the event.

### Responsive styling v.9
Worked on the styling to make it resposive. Still some work to be done but its functional now.
