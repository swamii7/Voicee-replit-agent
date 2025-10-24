# MYPA - Voice-Powered Personal Assistant

## Overview

MYPA is a mobile-first, voice-powered task management application designed with iOS-native design principles. The application enables users to create, organize, and manage tasks primarily through voice commands, with a visual interface optimized for iPhone users. The system combines natural language processing with a clean, scannable interface following Apple Human Interface Guidelines.

**Core Capabilities:**
- Voice-first task creation and management
- Natural language parsing for task attributes (title, notes, due dates, priority)
- Calendar view for temporal task organization
- Progressive Web App (PWA) with offline support
- iOS-optimized mobile experience

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **Styling**: Tailwind CSS with custom design tokens matching iOS aesthetics

**Design System:**
- Apple HIG-inspired component library (New York style from shadcn/ui)
- Custom color system with light/dark mode support using CSS variables
- Typography system based on SF Pro Text equivalents
- Safe area support for iOS notch and home indicator
- Bottom navigation pattern for mobile-first UX

**Key Architectural Decisions:**
- Voice-first interaction model requiring minimal visual confirmation
- Single-page application with client-side routing for app-like experience
- Mobile-optimized layouts with max-width constraints (max-w-2xl)
- Progressive enhancement with service worker for offline capability

### Backend Architecture

**Server**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints under `/api/*`
- **Development**: Vite middleware for HMR in development
- **Production**: Static file serving with pre-built client bundle
- **Storage**: In-memory storage implementation (MemStorage) with interface for future database migration

**Data Layer:**
- Drizzle ORM schema definitions prepared for PostgreSQL
- Type-safe data models using Zod schemas
- CRUD operations abstracted through IStorage interface

**Voice Processing Pipeline:**
1. Browser Speech Recognition API captures transcript
2. Backend `/api/voice/parse` endpoint processes transcript
3. OpenAI GPT-5 extracts structured task data (title, notes, dates, priority)
4. Parsed data validated against Zod schemas
5. Task created and returned to client

**Rationale for In-Memory Storage:**
- Rapid prototyping and development
- Database schema already defined (shared/schema.ts) for easy migration
- Clean separation via IStorage interface enables swapping implementations

### Data Models

**Task Schema:**
```typescript
{
  id: string (UUID)
  title: string (required)
  notes: string | null
  dueDate: Date | null
  dueTime: string | null (12-hour format)
  priority: "low" | "medium" | "high"
  completed: boolean
  completedAt: Date | null
  createdAt: Date
}
```

**Voice Command Schema:**
```typescript
{
  title: string
  notes?: string
  dueDate?: string (ISO format)
  dueTime?: string (12-hour format)
  priority?: "low" | "medium" | "high"
}
```

### PWA Features

**Progressive Web App Implementation:**
- Service worker registration for offline support
- Web App Manifest for installability
- Cache-first strategy for static assets
- Notification API integration (permission-based)
- iOS-specific meta tags for standalone app mode

**iOS Optimization:**
- Viewport configuration preventing zoom
- Safe area insets using CSS environment variables
- Apple touch icon and status bar styling
- Translucent status bar integration

## External Dependencies

### AI Integration
**OpenAI GPT-5 via Replit AI Integrations**
- Purpose: Natural language understanding for voice commands
- Usage: Parse transcripts into structured task data
- Integration: Replit's AI Integrations service (no API key required)
- Model: GPT-5 for advanced natural language processing

### Database (Prepared, Not Active)
**Neon Serverless PostgreSQL**
- Package: `@neondatabase/serverless`
- ORM: Drizzle with PostgreSQL dialect
- Migration Path: Schema defined in `shared/schema.ts`
- Current State: Infrastructure ready, using in-memory storage for development

### UI Component Libraries
**Radix UI Primitives**
- Purpose: Accessible, unstyled component primitives
- Components: Dialog, Dropdown, Popover, Toast, Tabs, Switch, and 20+ others
- Rationale: Accessibility compliance with customizable styling

**shadcn/ui**
- Purpose: Pre-styled components built on Radix UI
- Style: "New York" variant with iOS-inspired aesthetics
- Customization: Tailwind-based theming with CSS variables

### Utility Libraries
- `class-variance-authority`: Type-safe component variant management
- `clsx` + `tailwind-merge`: Conditional className composition
- `date-fns`: Date manipulation and formatting
- `cmdk`: Command palette component
- `embla-carousel-react`: Touch-friendly carousel

### Build Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Backend bundling for production
- **PostCSS**: Tailwind CSS processing
- **TypeScript**: Type safety across full stack

### Development Tools
- `tsx`: TypeScript execution for development server
- Replit-specific plugins: Runtime error overlay, cartographer, dev banner

### Browser APIs
- **Web Speech API**: Voice recognition (browser-native)
- **Service Worker API**: PWA offline support
- **Notification API**: Push notifications