import React from 'react';

interface ComponentModalityTemplatesProps {
    industry: string;
    onTemplatesLoaded: (templates: Record<string, any>) => void;
}

export const ComponentModalityTemplates: React.FC<ComponentModalityTemplatesProps> = ({
                                                                                          industry,
                                                                                          onTemplatesLoaded
                                                                                      }) => {
    React.useEffect(() => {
        // Load industry-specific templates
        const templates = loadTemplates(industry);
        onTemplatesLoaded(templates);
    }, [industry, onTemplatesLoaded]);

    return null;
};

function loadTemplates(industry: string): Record<string, any> {
    // Implement your template loading logic here
    return {
        industry,
        templates: {
            header: `${industry}-header-template`,
            hero: `${industry}-hero-template`,
            features: `${industry}-features-template`
        }
    };
}