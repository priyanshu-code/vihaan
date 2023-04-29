# vihaan

The client side is made with NEXT.JS

To run the client side:-
1) Open Client directory in the terminal and run the command "npm install".
2) After that run "npm run dev".

You might see an HYDRATION ERROR just ignore that (Close it).

To run the server side:- 
1) Open Server directory in the terminal and run the command "npm install".
2) You will need the .env file in the server directory and put the following 3 values in it :-
  a)JWT_LIFETIME = '30d'
  b)JWT_SECRET = 'YourSecretKey'
  c)MONGO_URI = 'connection string from mongodb'
3) After that run "npm start".

Your web app will be at localhost:3000 and server at localhost:5000 
