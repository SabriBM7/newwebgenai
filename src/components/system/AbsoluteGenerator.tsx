import React from 'react';

interface AbsoluteGeneratorProps {
    onGenerate: (absoluteData: any) => void;
}

export const AbsoluteGenerator: React.FC<AbsoluteGeneratorProps> = ({
                                                                        onGenerate
                                                                    }) => {
    React.useEffect(() => {
        // Generate absolute truth data
        const absoluteData = generateAbsoluteTruth();
        onGenerate(absoluteData);
    }, [onGenerate]);

    return null;
};

function generateAbsoluteTruth(): any {
    return {
        timestamp: Date.now(),
        value: 42, // The answer to everything
        source: 'absolute'
    };
}