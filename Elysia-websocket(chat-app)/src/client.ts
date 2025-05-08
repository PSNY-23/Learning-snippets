const ws = new WebSocket("ws://localhost:3000/chat");


    // When the WebSocket connection is open
    ws.onopen = () => {
      console.log("Connected to WebSocket server from client");
    };

    // When a message is received from the server
    ws.onmessage = (event) => {
      console.log(event.data, "message from server")
    };

    // When WebSocket connection is closed
    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };
