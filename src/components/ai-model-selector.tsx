"use client"
import { SimpleRadioGroup, SimpleRadioGroupItem } from "@/components/ui/simple-radio-group"
import { Label } from "@/components/ui/label"
import { Zap, Server, AlertTriangle } from "lucide-react"

interface AIModelSelectorProps {
    availability: {
        wizardlm: boolean
        ollama: boolean
    }
    selectedModel: string
    onSelectModel: (model: string) => void
}

export default function AIModelSelector({ availability, selectedModel, onSelectModel }: AIModelSelectorProps) {
    const handleModelChange = (value: string) => {
        onSelectModel(value)
    }

    return (
        <div className="space-y-4">
            <SimpleRadioGroup value={selectedModel} onValueChange={handleModelChange} className="space-y-3">
                <div className="flex items-start space-x-3">
                    <SimpleRadioGroupItem value="wizardlm" id="wizardlm" disabled={!availability.wizardlm} />
                    <div className="grid gap-1.5">
                        <Label
                            htmlFor="wizardlm"
                            className={`text-white flex items-center ${!availability.wizardlm ? "opacity-50" : ""}`}
                        >
                            <Zap className="h-4 w-4 mr-2 text-purple-400" />
                            WizardLM-2 (Recommended)
                            {!availability.wizardlm && (
                                <span className="ml-2 text-xs text-yellow-400 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Not detected
                </span>
                            )}
                        </Label>
                        <p className={`text-sm text-gray-400 ${!availability.wizardlm ? "opacity-50" : ""}`}>
                            Best quality results with creative and detailed output
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <SimpleRadioGroupItem value="ollama" id="ollama" disabled={!availability.ollama} />
                    <div className="grid gap-1.5">
                        <Label
                            htmlFor="ollama"
                            className={`text-white flex items-center ${!availability.ollama ? "opacity-50" : ""}`}
                        >
                            <Server className="h-4 w-4 mr-2 text-blue-400" />
                            Ollama
                            {!availability.ollama && (
                                <span className="ml-2 text-xs text-yellow-400 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Not detected
                </span>
                            )}
                        </Label>
                        <p className={`text-sm text-gray-400 ${!availability.ollama ? "opacity-50" : ""}`}>
                            Fast generation with good quality results
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <SimpleRadioGroupItem value="mock" id="mock" />
                    <div className="grid gap-1.5">
                        <Label htmlFor="mock" className="text-white">
                            Mock Generator
                        </Label>
                        <p className="text-sm text-gray-400">Instant results with pre-designed templates (no AI required)</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <SimpleRadioGroupItem value="auto" id="auto" />
                    <div className="grid gap-1.5">
                        <Label htmlFor="auto" className="text-white">
                            Auto (Recommended)
                        </Label>
                        <p className="text-sm text-gray-400">Automatically selects the best available AI model</p>
                    </div>
                </div>
            </SimpleRadioGroup>
        </div>
    )
}
