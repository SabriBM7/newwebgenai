import React from 'react';

interface ComponentDiaryProps {
    components: string[];
    onAnalyze: (analysis: Record<string, any>) => void;
}

export const ComponentDiary: React.FC<ComponentDiaryProps> = ({
                                                                  components,
                                                                  onAnalyze
                                                              }) => {
    React.useEffect(() => {
        // Analyze component usage
        const analysis = analyzeComponentUsage(components);
        onAnalyze(analysis);
    }, [components, onAnalyze]);

    return null;
};

function analyzeComponentUsage(components: string[]): Record<string, any> {
    const counts: Record<string, number> = {};

    components.forEach(component => {
        counts[component] = (counts[component] || 0) + 1;
    });

    return {
        total: components.length,
        unique: Object.keys(counts).length,
        counts
    };
}