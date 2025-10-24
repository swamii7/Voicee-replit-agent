# MYPA Design Guidelines

## Design Approach

**Selected System**: Apple Human Interface Guidelines (iOS-focused)
**Supplementary Reference**: Things 3, Todoist for productivity patterns

**Rationale**: MYPA is a utility-focused productivity tool requiring clarity, efficiency, and iOS-native feel. Apple HIG provides the foundation for an interface that feels natural to iPhone users while supporting PWA capabilities.

**Core Principles**:
- Voice-first interaction with visual clarity
- Instant feedback for all voice commands
- Scannable task hierarchy
- Minimal cognitive load for quick task entry

## Typography System

**Font Stack**: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui
- **Primary Heading (Task Titles)**: 18px, semibold (font-semibold)
- **Secondary Heading (Section Headers)**: 16px, medium (font-medium)
- **Body Text (Task Details)**: 15px, regular (font-normal)
- **Supporting Text (Timestamps, Metadata)**: 13px, regular with reduced opacity
- **Voice Command Feedback**: 20px, medium (prominent during dictation)

**Line Heights**: Use relaxed (leading-relaxed) for readability on mobile screens

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Tight spacing: p-2, gap-2 (within components)
- Standard spacing: p-4, gap-4 (between elements)
- Section spacing: p-6, py-8 (major sections)
- Generous spacing: p-12, py-16 (key focal areas)

**Container Strategy**:
- Full-width app with max-w-2xl centered content
- Safe area padding for iOS notch/home indicator: px-4 sm:px-6
- Bottom navigation spacing: pb-24 (accounts for floating action button)

**Grid System**:
- Single column for task lists (mobile-optimized)
- Calendar view: 7-column grid for week view

## Core Application Structure

### 1. Navigation System
**Bottom Tab Bar** (iOS pattern):
- Fixed position with backdrop blur
- Four primary tabs: Tasks, Calendar, Voice, Settings
- Active state with icon fill + subtle scale
- Height: h-16 with safe-area-inset padding

### 2. Voice Interface (Primary Feature)

**Floating Voice Button**:
- Large circular button: w-16 h-16
- Positioned bottom-center above tab bar
- Pulsing animation during listening state
- Ripple effect on activation
- Shadow elevation: shadow-2xl

**Voice Recording Modal**:
- Full-screen overlay with dimmed background
- Waveform visualization during recording
- Large text display showing transcription in real-time
- Confirm/Cancel buttons below transcription
- Haptic feedback on voice detection

**Voice Feedback Panel**:
- Slide-up panel showing AI interpretation
- Extracted task details: title, date, time, priority
- Edit fields for quick corrections
- "Looks good" / "Try again" actions

### 3. Task Management Components

**Task Card**:
- Rounded corners: rounded-xl
- Padding: p-4
- Border with shadow: border shadow-sm
- Swipe actions: Complete (left), Delete (right)
- Checkbox: w-6 h-6 rounded-md with checkmark animation
- Layout: Checkbox | [Title / Details / Time] | Priority indicator

**Task List Organization**:
- Grouped by: Today, Tomorrow, Upcoming, Someday
- Sticky section headers with backdrop blur
- Empty state with voice prompt illustration

**Task Details**:
- Title (bold, larger text)
- Subtitle/notes (lighter, smaller)
- Time badge (rounded-full, px-3 py-1)
- Priority indicator: colored vertical bar on left edge (h-full w-1)

### 4. Calendar View

**Month View**:
- Compact header with month/year
- 7-column grid for days
- Date cells: aspect-square with dot indicators for tasks
- Current day: bold with ring-2

**Day View (Expanded)**:
- Timeline with hourly markers
- Task blocks positioned by time
- Gesture: Tap day in month to expand

### 5. Notification Components

**Notification Preview Cards**:
- Slide from top animation
- Icon | Title | Time | Action buttons
- Dismiss swipe gesture
- Auto-dismiss after 5 seconds

**Notification Settings Panel**:
- Toggle switches for notification types
- Time picker for daily digest
- Do Not Disturb schedule

### 6. Settings & Profile

**Settings List** (iOS pattern):
- Grouped sections with headers
- Disclosure indicators (chevron-right) for sub-menus
- Toggle switches for preferences
- Voice training option for better recognition

## Interaction Patterns

**Primary Actions**:
- Voice button: Always accessible, primary method
- Fab (Floating Action Button) for manual task entry
- Swipe gestures for task completion/deletion

**Feedback Mechanisms**:
- Haptic feedback on voice activation
- Checkmark animation on task completion
- Subtle bounce on button press
- Toast messages for confirmations

**Loading States**:
- Skeleton screens for task list loading
- Spinner overlay during voice processing
- Progressive disclosure for long lists

## Accessibility

**Voice-First Accessibility**:
- Large tap targets (min 44x44px)
- High contrast text ratios
- VoiceOver labels for all interactive elements
- Alternative text input for users unable to use voice

**Visual Indicators**:
- Color-independent priority system (use shapes/icons)
- Clear focus states for keyboard navigation
- Sufficient spacing between interactive elements

## PWA-Specific Elements

**Install Prompt**:
- Bottom sheet with "Add to Home Screen" instructions
- Dismiss option that respects user choice
- Appears after first successful voice command

**Offline Indicator**:
- Subtle banner at top when offline
- Visual distinction for unsynced tasks
- Retry sync button

## Images

**Voice Illustration** (Hero-style element on first launch):
- Centered microphone icon with concentric circles
- Placement: Above voice button on empty state
- Style: Line art, minimal, welcoming
- Purpose: Encourage first voice interaction

**Empty State Illustrations**:
- "No tasks" state: Person relaxing with checkmarks floating
- "Speak to add tasks" state: Microphone with speech bubble
- Placement: Center of task list when empty
- Size: max-w-xs mx-auto

**No large hero images** - This is a utility app focused on immediate task entry and management.

## Animation Philosophy

**Minimal, Purposeful Motion**:
- Voice button pulse (breathing animation)
- Task completion checkmark
- Slide-in notifications
- Page transitions: smooth slide (300ms)

**Avoid**:
- Excessive scroll animations
- Decorative parallax
- Auto-playing elements

This design creates a clean, focused productivity experience that prioritizes voice interaction while maintaining the polished feel iOS users expect.