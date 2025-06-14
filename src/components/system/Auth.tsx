import React from 'react';

interface AuthProps {
    credentials: { username: string; password: string };
    onAuthenticated: (token: string) => void;
    onError?: (error: Error) => void;
}

export const Auth: React.FC<AuthProps> = ({
                                              credentials,
                                              onAuthenticated,
                                              onError
                                          }) => {
    React.useEffect(() => {
        try {
            // Simulate authentication
            if (credentials.username && credentials.password) {
                const token = btoa(`${credentials.username}:${credentials.password}`);
                onAuthenticated(token);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            onError?.(error instanceof Error ? error : new Error('Authentication failed'));
        }
    }, [credentials, onAuthenticated, onError]);

    return null;
};