import { addWebSocketListener, removeWebSocketListener } from '@/services/ws/manager';
import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const useWebSocket = () => {
    const [message, setMessage] = useState<any>(null);

    useEffect(() => {
        const handleMessage = (msg: any) => {
            setMessage(msg);
        };

        addWebSocketListener(handleMessage);

        return () => {
            removeWebSocketListener(handleMessage);
        };
    }, []);

    return message;
};