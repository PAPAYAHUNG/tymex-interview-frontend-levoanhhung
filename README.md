# Tyme Test Project

A monorepo project containing both frontend and backend applications.

## Project Structure

```
├── packages/
│   ├── frontend/          # React + Vite frontend application
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/       # Page components
│   │   │   ├── services/    # API services
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   ├── utils/       # Utility functions
│   │   │   ├── styles/      # Global styles and CSS
│   │   │   ├── types/       # TypeScript type definitions
│   │   │   └── tests/       # Test files
│   │   └── ...
│   └── backend/           # Backend application (to be implemented)
└── ...
```

## Tech Stack

### Frontend
- React + Vite
- TypeScript
- Ant Design
- Vanilla CSS
- Vitest for testing
- ESLint + Prettier for code formatting

### Backend
- To be implemented

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
# Frontend
cd packages/frontend
pnpm dev

# Backend (when implemented)
cd packages/backend
pnpm dev
```

## Development

### Frontend
- The frontend is built with React and TypeScript
- Uses Ant Design for UI components
- Custom styling with vanilla CSS
- Path aliases configured (@/ points to src/)
- Unit testing with Vitest and Testing Library

### Code Quality
- ESLint for code linting
- TypeScript for type checking
- Unit tests with >40% coverage requirement

## Features
- User data fetching from API
- Search and filter functionality
- Load more data capability
- Auto-refresh every 60 seconds
- Responsive design (Desktop/Tablet/Mobile)
- Loading states and error handling 