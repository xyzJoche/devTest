import React, { useEffect } from 'react';

const WebSocketConnection = () => {
  useEffect(() => {
    const socket = new WebSocket('wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBTUSD');

    socket.onopen = () => {
      console.log('WebSocket connected successfully!');
    };

    socket.onmessage = (event) => {const data = JSON.parse(event.data);};

    socket.onclose = () => {
      console.log('WebSocket connection terminated.');
    };

    return () => {
      socket.close();
    };
  }, []);

};

export default WebSocketConnection;
