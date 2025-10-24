import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TaskList } from "@/components/TaskList";
import { VoiceButton } from "@/components/VoiceButton";
import { VoiceModal } from "@/components/VoiceModal";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Task, VoiceCommand } from "@shared/schema";

export default function TasksPage() {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [parsedCommand, setParsedCommand] = useState<VoiceCommand | null>(null);
  const { toast } = useToast();
  
  const {
    isListening,
    transcript,
    error: voiceError,
    isSupported,
    startListening: startVoiceListening,
    stopListening: stopVoiceListening,
  } = useVoiceRecognition();

  // Fetch tasks
  const { data: tasks = [], isLoading, isError, error, refetch } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  // Parse voice command
  const parseCommandMutation = useMutation({
    mutationFn: async (transcript: string) => {
      const response = await apiRequest<VoiceCommand>("POST", "/api/voice/parse", { transcript });
      return response;
    },
    onSuccess: (data) => {
      setParsedCommand(data);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to understand your command. Please try again.",
        variant: "destructive",
      });
      console.error("Parse error:", error);
    },
  });

  // Create task
  const createTaskMutation = useMutation({
    mutationFn: async (command: VoiceCommand) => {
      const taskData = {
        title: command.title,
        notes: command.notes,
        dueDate: command.dueDate ? new Date(command.dueDate) : null,
        dueTime: command.dueTime,
        priority: command.priority || "medium",
        completed: false,
      };
      return await apiRequest<Task>("POST", "/api/tasks", taskData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task created successfully!",
      });
      handleCloseModal();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
      console.error("Create task error:", error);
    },
  });

  // Toggle task completion
  const toggleCompleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest<Task>("POST", `/api/tasks/${id}/toggle`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to update task.",
        variant: "destructive",
      });
      console.error("Toggle error:", error);
    },
  });

  // Delete task
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/tasks/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to delete task.",
        variant: "destructive",
      });
      console.error("Delete error:", error);
    },
  });

  // Watch for transcript changes and parse
  useEffect(() => {
    if (transcript && !isListening && isVoiceModalOpen) {
      parseCommandMutation.mutate(transcript);
    }
  }, [transcript, isListening]);

  useEffect(() => {
    if (voiceError) {
      toast({
        title: "Voice Recognition Error",
        description: voiceError,
        variant: "destructive",
      });
    }
  }, [voiceError]);

  const handleStartListening = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    setIsVoiceModalOpen(true);
    setParsedCommand(null);
    startVoiceListening();
  };

  const handleStopListening = () => {
    stopVoiceListening();
  };

  const handleCloseModal = () => {
    setIsVoiceModalOpen(false);
    setParsedCommand(null);
    stopVoiceListening();
  };

  const handleConfirm = () => {
    if (parsedCommand) {
      createTaskMutation.mutate(parsedCommand);
    }
  };

  const handleRetry = () => {
    setParsedCommand(null);
    handleStartListening();
  };

  const handleToggleComplete = (id: string) => {
    toggleCompleteMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md px-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Failed to Load Tasks</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {error instanceof Error ? error.message : "An error occurred while loading your tasks"}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover-elevate active-elevate-2 font-medium"
            data-testid="button-retry-tasks"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tap the microphone to add tasks with your voice
          </p>
        </header>

        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      </div>

      <VoiceButton
        isListening={isListening}
        onStartListening={handleStartListening}
        onStopListening={handleStopListening}
      />

      <VoiceModal
        isOpen={isVoiceModalOpen}
        isListening={isListening}
        transcript={transcript}
        parsedCommand={parsedCommand}
        isProcessing={parseCommandMutation.isPending}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        onRetry={handleRetry}
      />
    </div>
  );
}
