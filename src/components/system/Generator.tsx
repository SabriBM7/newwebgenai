import React from 'react';

interface GeneratorProps {
    schema: Record<string, any>;
    onGenerate: (data: any) => void;
}

export const Generator: React.FC<GeneratorProps> = ({
                                                        schema,
                                                        onGenerate
                                                    }) => {
    React.useEffect(() => {
        // Generate data based on schema
        const generated = generateFromSchema(schema);
        onGenerate(generated);
    }, [schema, onGenerate]);

    return null;
};

function generateFromSchema(schema: Record<string, any>): any {
    const result: Record<string, any> = {};

    for (const [key, type] of Object.entries(schema)) {
        switch (type) {
            case 'string':
                result[key] = `Generated ${key}`;
                break;
            case 'number':
                result[key] = Math.floor(Math.random() * 100);
                break;
            case 'boolean':
                result[key] = Math.random() > 0.5;
                break;
            default:
                result[key] = null;
        }
    }

    return result;
}