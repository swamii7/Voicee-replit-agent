import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VoiceButtonProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

export function VoiceButton({ isListening, onStartListening, onStopListening }: VoiceButtonProps) {
  const [ripples, setRipples] = useState<number[]>([]);

  const handleClick = () => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
      setRipples([...ripples, Date.now()]);
      setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
    }
  };

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50" style={{ paddingBottom: "var(--sab, 0px)" }}>
      <div className="relative">
        {ripples.map((key) => (
          <div
            key={key}
            className="absolute inset-0 rounded-full bg-primary/30 animate-ripple"
            style={{ width: "64px", height: "64px" }}
          />
        ))}
        <Button
          size="icon"
          variant={isListening ? "default" : "default"}
          className={`w-16 h-16 rounded-full shadow-2xl ${isListening ? "animate-pulse" : ""}`}
          onClick={handleClick}
          data-testid="button-voice"
        >
          <Mic className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
