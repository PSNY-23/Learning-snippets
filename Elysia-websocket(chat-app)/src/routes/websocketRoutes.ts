import Elysia from "elysia";


export const webSocketRoutes = new Elysia();


webSocketRoutes.ws('/chat', {
    //jak koi message aayega to kya karna hai
    message(ws, message) {
      console.log('Received:', message);
      ws.send(`You said: ${message}`);
    },
    //jab koi connect hoga to kya karna hai
    open(ws) {
      console.log('Client connected');
      ws.send('Welcome to the chat! for pankaj');
    },
    //jab connection close hoga tab kya karna hai
    close(ws) {
      console.log('Client disconnected');
    }
  });