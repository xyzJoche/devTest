import React from 'react';
import WebSocketConnection from './WebSocketConnection';
import DataSearch from './DataSearch';


// Due to some firewall technical difficulty in my laptop I can't seem to get the App.js connected to my local db nor even a websocket server in server.js
// Because of this, testing has been very difficult and I did not manage to spend time in UI/UX. Thank you!

const express =require('express')
const mongoose =require('mongoose')

const url= "mongodb://localhost:27017/datatest"
const port = 3000;
const app= express()


mongoose.connect(url, {})
  .then(result => console.log("Connected!"))
  .catch(err => console.log(err))

app.listen(port, () => {
  console.log("server port:" + port)
})



const App = () => {
  return (
    <div>
      <WebSocketConnection />
      <DataSearch />
    </div>
  );
};

export default App;
