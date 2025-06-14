import React from 'react';

interface AirMultiplexProps {
    channels: any[];
    onTransmit: (data: any) => void;
}

export const AirMultiplex: React.FC<AirMultiplexProps> = ({
                                                              channels,
                                                              onTransmit
                                                          }) => {
    React.useEffect(() => {
        // Multiplex data from multiple channels
        const multiplexed = multiplexChannels(channels);
        onTransmit(multiplexed);
    }, [channels, onTransmit]);

    return null;
};

function multiplexChannels(channels: any[]): any {
    return {
        timestamp: Date.now(),
        channels: channels.map((ch, i) => ({
            id: i,
            data: ch
        }))
    };
}