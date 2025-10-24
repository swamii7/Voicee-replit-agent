import { useEffect, useState } from "react";
import { X, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { VoiceCommand } from "@shared/schema";

interface VoiceModalProps {
  isOpen: boolean;
  isListening: boolean;
  transcript: string;
  parsedCommand: VoiceCommand | null;
  isProcessing: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onRetry: () => void;
}

export function VoiceModal({
  isOpen,
  isListening,
  transcript,
  parsedCommand,
  isProcessing,
  onClose,
  onConfirm,
  onRetry,
}: VoiceModalProps) {
  const [waveformBars, setWaveformBars] = useState<number[]>([]);

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setWaveformBars(Array.from({ length: 20 }, () => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setWaveformBars([]);
    }
  }, [isListening]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-fade-in">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Voice Input</h2>
            <Button size="icon" variant="ghost" onClick={onClose} data-testid="button-close-voice">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {isListening && (
            <div className="mb-6">
              <div className="flex items-end justify-center gap-1 h-24">
                {waveformBars.map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full transition-all duration-100"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">Listening...</p>
            </div>
          )}

          {transcript && !isListening && (
            <div className="mb-6">
              <p className="text-base leading-relaxed text-foreground mb-4" data-testid="text-transcript">
                "{transcript}"
              </p>
              
              {isProcessing && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              )}

              {parsedCommand && !isProcessing && (
                <div className="space-y-3 p-4 bg-accent/50 rounded-xl">
                  <p className="text-sm font-medium text-accent-foreground">Task Details:</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Title</p>
                      <p className="text-sm font-medium" data-testid="text-parsed-title">{parsedCommand.title}</p>
                    </div>
                    {parsedCommand.notes && (
                      <div>
                        <p className="text-xs text-muted-foreground">Notes</p>
                        <p className="text-sm" data-testid="text-parsed-notes">{parsedCommand.notes}</p>
                      </div>
                    )}
                    {parsedCommand.dueDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Due Date</p>
                        <p className="text-sm" data-testid="text-parsed-date">
                          {parsedCommand.dueDate}
                          {parsedCommand.dueTime && ` at ${parsedCommand.dueTime}`}
                        </p>
                      </div>
                    )}
                    {parsedCommand.priority && (
                      <div>
                        <p className="text-xs text-muted-foreground">Priority</p>
                        <p className="text-sm capitalize" data-testid="text-parsed-priority">{parsedCommand.priority}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {parsedCommand && !isProcessing && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={onRetry} className="flex-1" data-testid="button-retry">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={onConfirm} className="flex-1" data-testid="button-confirm">
                <Check className="w-4 h-4 mr-2" />
                Looks Good
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
