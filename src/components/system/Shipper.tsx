import React from 'react';

interface ShipperProps {
    data: any;
    destination: string;
    onShipped?: () => void;
    onError?: (error: Error) => void;
}

export const Shipper: React.FC<ShipperProps> = ({
                                                    data,
                                                    destination,
                                                    onShipped,
                                                    onError
                                                }) => {
    React.useEffect(() => {
        try {
            // Simulate shipping data to destination
            console.log(`Shipping data to ${destination}`, data);
            onShipped?.();
        } catch (error) {
            onError?.(error instanceof Error ? error : new Error('Shipping failed'));
        }
    }, [data, destination, onShipped, onError]);

    return null;
};