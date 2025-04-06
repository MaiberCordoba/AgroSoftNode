const SOCKET_URL = "ws://localhost:8080"; 

export const connectWebSocket = (onMessage: (data: any) => void) => {
  const socket = new WebSocket(SOCKET_URL);

  socket.onopen = () => console.log("✅ WebSocket conectado a Node.js");

  socket.onmessage = (event) => {
    try {
      const newData = JSON.parse(event.data);
      onMessage(newData);
    } catch (error) {
      console.error("❌ Error al parsear JSON del WebSocket:", error);
    }
  };

  socket.onerror = (error) => {
    console.error("❌ Error en WebSocket:", error);
  };

  socket.onclose = () => {
    console.warn("⚠️ WebSocket cerrado, reintentando en 5 segundos...");
    setTimeout(() => connectWebSocket(onMessage), 5000);
  };

  return socket;
};
