import { Environment } from "@/constants/enums";

/* eslint-disable @typescript-eslint/no-explicit-any */

let websocketInstance: WebSocket | null = null;
const messageListeners: ((message: any) => void)[] = [];
export const getWebSocketInstance = (): WebSocket | null => {
    return websocketInstance;
};

export const setWebSocketInstance = (ws: WebSocket | null): void => {
    if (websocketInstance) {
        websocketInstance.close();
    }
    websocketInstance = ws;

    if (ws) {
        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                messageListeners.forEach(listener => listener(message));
            } catch (error) {
                if (process.env.NODE_ENV === Environment.DEVELOPMENT) console.log(error)
            }
        };
    }
};

export const sendWebSocketMessage = (message: any): boolean => {
    if (websocketInstance && websocketInstance.readyState === WebSocket.OPEN) {
        websocketInstance.send(JSON.stringify(message));
        return true;
    }
    return false;
};

export const addWebSocketListener = (listener: (message: any) => void): void => {
    messageListeners.push(listener);
};

export const removeWebSocketListener = (listener: (message: any) => void): void => {
    const index = messageListeners.indexOf(listener);
    if (index > -1) {
        messageListeners.splice(index, 1);
    }
};