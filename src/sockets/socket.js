import { io } from "socket.io-client";

const URL = import.meta.env.VITE_WS_URL;

const socket = io(URL, {
    withCredentials: true,
    transports: ["websocket"],
    autoConnect: false,
});

export const connectsocket = () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token not found. Please sign in again.");
    socket.auth = { token };
    socket.connect();
}

export const disconnectSocket = () => {
    socket.disconnect();
}

export const isSocketConnected = () => {
    return socket.connected;
}

export const listenEvent = (event, callback) => {
    socket.on(event, callback);
};

export const listenEventOnce = (event, callback) => {
    socket.once(event, callback);
}

export const removeListener = (event, callback) => {
    socket.off(event, callback);
};

export const emitEvent = (event, data = {}, ack) => {
    socket.emit(event, data, ack);
};

export const emitWithRetry = (event, data = {}, retries = 5, timeout = 1000) => {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const tryEmit = () => {
            attempts++;

            socket.timeout(timeout).emit(event, data, (err, response) => {
                if (err) {

                    if (attempts >= retries) {
                        return reject(new Error("Server not responding"));
                    }
                    // retry
                    return tryEmit();
                }
                resolve(response);
            });
        };
        tryEmit();
    });
};