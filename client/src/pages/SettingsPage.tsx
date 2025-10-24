import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Volume2, Moon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your MYPA experience
          </p>
        </header>

        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="text-sm">
                  Push Notifications
                </Label>
                <Switch id="push-notifications" data-testid="switch-push-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="task-reminders" className="text-sm">
                  Task Reminders
                </Label>
                <Switch id="task-reminders" defaultChecked data-testid="switch-task-reminders" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="daily-digest" className="text-sm">
                  Daily Digest
                </Label>
                <Switch id="daily-digest" data-testid="switch-daily-digest" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Voice
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-feedback" className="text-sm">
                  Voice Feedback
                </Label>
                <Switch id="voice-feedback" defaultChecked data-testid="switch-voice-feedback" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-listen" className="text-sm">
                  Auto-listen on Launch
                </Label>
                <Switch id="auto-listen" data-testid="switch-auto-listen" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Appearance
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-sm">
                  Dark Mode
                </Label>
                <Switch id="dark-mode" data-testid="switch-dark-mode" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-base font-semibold mb-4">About</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>MYPA - Your Personal Assistant</p>
              <p>Version 1.0.0</p>
              <p className="leading-relaxed">
                A voice-first productivity app for managing tasks and reminders with AI-powered natural language processing.
              </p>
            </div>
          </Card>

          <Button variant="outline" className="w-full" data-testid="button-install-pwa">
            Install MYPA as App
          </Button>
        </div>
      </div>
    </div>
  );
}
