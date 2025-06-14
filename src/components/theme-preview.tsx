import { getThemeById } from "@/lib/theme-system-enhanced"

interface ThemePreviewProps {
    themeId: string
}

export default function ThemePreview({ themeId }: ThemePreviewProps) {
    const theme = getThemeById(themeId)

    return (
        <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Theme: {theme.name}</h3>
            <p className="text-sm mb-4">{theme.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <h4 className="text-sm font-medium mb-2">Colors</h4>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded mr-2" style={{ backgroundColor: theme.colors.primary }}></div>
                            <span className="text-xs">Primary</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded mr-2" style={{ backgroundColor: theme.colors.secondary }}></div>
                            <span className="text-xs">Secondary</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded mr-2" style={{ backgroundColor: theme.colors.accent }}></div>
                            <span className="text-xs">Accent</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium mb-2">Typography</h4>
                    <div className="space-y-2">
                        <div className="text-xs">
                            <span className="font-medium">Body: </span>
                            <span style={{ fontFamily: theme.typography.fontFamily }}>
                {theme.typography.fontFamily.split(",")[0]}
              </span>
                        </div>
                        {theme.typography.headingFontFamily && (
                            <div className="text-xs">
                                <span className="font-medium">Headings: </span>
                                <span style={{ fontFamily: theme.typography.headingFontFamily }}>
                  {theme.typography.headingFontFamily.split(",")[0]}
                </span>
                            </div>
                        )}
                        <div className="text-xs">
                            <span className="font-medium">Base size: </span>
                            {theme.typography.baseFontSize}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div
                    className="p-4 rounded"
                    style={{
                        backgroundColor: theme.colors.primary,
                        color: "#ffffff",
                        borderRadius: theme.borderRadius.medium,
                    }}
                >
                    <h4
                        className="font-medium"
                        style={{ fontFamily: theme.typography.headingFontFamily || theme.typography.fontFamily }}
                    >
                        Primary Button
                    </h4>
                </div>

                <div
                    className="p-4 rounded"
                    style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.text,
                        borderRadius: theme.borderRadius.medium,
                        boxShadow: theme.shadows.medium,
                        border: `1px solid ${theme.colors.border}`,
                    }}
                >
                    <h4
                        className="font-medium mb-2"
                        style={{ fontFamily: theme.typography.headingFontFamily || theme.typography.fontFamily }}
                    >
                        Card Component
                    </h4>
                    <p className="text-sm" style={{ fontFamily: theme.typography.fontFamily }}>
                        This is how content would look in this theme.
                    </p>
                </div>
            </div>
        </div>
    )
}
