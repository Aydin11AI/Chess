# Overview

This is a full-stack web-based chess game application built with React on the frontend and Express.js on the backend. The application features a modern chess interface with game lobby functionality, allowing users to create private rooms or join quick matches. The frontend uses a comprehensive chess engine with move validation, game state management, and 3D graphics capabilities through React Three Fiber.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript and Vite for fast development
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: Zustand for global state management with separate stores for chess game logic, audio controls, and general game state
- **3D Graphics**: React Three Fiber and React Three Drei for potential 3D chess board rendering
- **Routing**: Single-page application with mode-based navigation (lobby vs game)

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Development Setup**: Uses Vite middleware in development for hot reloading
- **Storage Interface**: Abstract storage pattern with in-memory implementation (MemStorage class)
- **API Structure**: RESTful API with /api prefix for all routes
- **Build Process**: esbuild for server bundling, separate client/server build outputs

## Data Management
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: User authentication system with username/password fields
- **Development Storage**: In-memory storage implementation for development
- **Migration System**: Drizzle migrations stored in ./migrations directory

## Chess Game Engine
- **Game Logic**: Custom chess engine with complete move validation
- **Board Representation**: 8x8 array-based board state
- **Move System**: Comprehensive move tracking with special moves (castling, en passant, promotion)
- **Game State**: Real-time game status tracking (playing, check, checkmate, stalemate)

## Component Architecture
- **Chess Components**: Modular chess board, piece, and game status components
- **UI Components**: Extensive shadcn/ui component library integration
- **Page Structure**: Lobby and game pages with shared layout components
- **Responsive Design**: Mobile-friendly interface with adaptive layouts

# External Dependencies

## Core Technologies
- **React Ecosystem**: React 18 with TypeScript, Vite build system
- **Backend**: Express.js with TypeScript support via tsx
- **Database**: PostgreSQL with Neon Database serverless connector
- **ORM**: Drizzle ORM with Drizzle Kit for migrations

## UI and Styling
- **CSS Framework**: Tailwind CSS with PostCSS processing
- **Component Library**: Radix UI primitives with shadcn/ui components
- **Icons**: Lucide React icon library
- **Fonts**: Inter font family via Fontsource

## 3D Graphics and Audio
- **3D Rendering**: React Three Fiber, React Three Drei, React Three Postprocessing
- **Audio Support**: Built-in audio management system for game sounds
- **Asset Loading**: Support for GLTF/GLB 3D models and audio formats

## Development Tools
- **Build Tools**: Vite with React plugin, esbuild for production builds
- **Shader Support**: GLSL shader support via vite-plugin-glsl
- **Development**: Runtime error overlay for enhanced debugging
- **Type Safety**: Full TypeScript implementation across client and server

## State Management and Data Fetching
- **Client State**: Zustand with subscription support for reactive updates
- **Server Communication**: TanStack Query for efficient data fetching and caching
- **Form Handling**: React Hook Form with Zod schema validation
- **Local Storage**: Custom utilities for persistent client-side data

## Production Deployment
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple
- **Static Assets**: Vite-built client served from Express server
- **Environment**: NODE_ENV-based configuration for development/production modes