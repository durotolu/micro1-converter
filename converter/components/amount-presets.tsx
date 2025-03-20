"use client"

import { Button } from "@/components/ui/button"

interface AmountPresetsProps {
  onPresetClick: (amount: number) => void
}

export function AmountPresets({ onPresetClick }: AmountPresetsProps) {
  const presets = [10, 50, 100, 500, 1000]

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {presets.map((preset) => (
        <Button
          key={preset}
          variant="outline"
          size="sm"
          onClick={() => onPresetClick(preset)}
          className="flex-1 min-w-[60px]"
        >
          {preset}
        </Button>
      ))}
    </div>
  )
}

