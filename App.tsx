// App.tsx  or  any main component
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { io, Socket } from 'socket.io-client';
import { API_URL_SOCKET } from './constants';

export default function App() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [receivedImage, setReceivedImage] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);

    // Connect to socket when component mounts
    useEffect(() => {
        // Prevent multiple connections
        if (socketRef.current) return;

        const newSocket = io(API_URL_SOCKET, {
            reconnection: true,
            reconnectionAttempts: 5,
            timeout: 10000,
            autoConnect: true,
            transports: ['websocket', 'polling'], // try websocket first
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Socket connected!', newSocket.id);
            setConnected(true);
        });

        newSocket.on('connect_error', (err) => {
            console.log('Socket connection error:', err.message);
            setConnected(false);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
            setConnected(false);
        });

        // Receive image from other clients
        newSocket.on('img', (data: string) => {
            console.log('Received image from server');
            setReceivedImage(data);
        });

        // Server welcome/test message
        newSocket.on('server', (ready: boolean) => {
            console.log('Server says ready:', ready);
        });

        // Cleanup on unmount
        return () => {
            console.log('Cleaning up socket...');
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, []);


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Socket.IO Image Share</Text>

            <View style={styles.connectionStatus}>
                <Text style={{ color: connected ? '#4CAF50' : '#F44336', fontWeight: 'bold' }}>
                    {connected ? '● Connected' : '○ Disconnected'}
                </Text>
            </View>

            {imageUri && (
                <>
                    <Text style={styles.subtitle}>Your selected image:</Text>
                    <Image source={{ uri: imageUri }} style={styles.preview} />
                </>
            )}

            {receivedImage && (
                <>
                    <Text style={styles.subtitle}>Image received from others:</Text>
                    <Image source={{ uri: receivedImage }} style={styles.preview} />
                </>
            )}

            <View style={styles.info}>
                <Text style={{ textAlign: 'center', color: '#666' }}>
                    Server: {API_URL_SOCKET}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 18,
        marginTop: 24,
        marginBottom: 8,
        fontWeight: '600',
    },
    connectionStatus: {
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonContainer: {
        marginVertical: 16,
    },
    preview: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        marginTop: 8,
        backgroundColor: '#eee',
    },
    info: {
        marginTop: 40,
        marginBottom: 20,
    },
});