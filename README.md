# Tyme Test Project

A monorepo project containing both frontend and backend applications. This project aims to provide a comprehensive solution for managing tasks efficiently, with a focus on scalability and maintainability. The frontend is built using modern web technologies, while the backend is designed to be robust and easily extendable.

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
- Express + Json server 

## Getting Started

To get started with the Tyme Test Project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd tymeTest
   ```

2. **Install dependencies**:
   Ensure you have [pnpm](https://pnpm.io/) installed globally, then run:
   ```bash
   pnpm install
   ```

3. **Set up environment variables** for both Frontend and Backend:
   Copy the `example.env` file to `.env` and configure your environment variables:
   ```bash
   cp example.env .env
   ```

4. **Start the development server**:
   From the root directory, you can start both the frontend and backend (when implemented) using:
   ```bash
   pnpm dev
   ```

## Testing

To run tests and check test coverage, use the following commands:

1. **Run tests**:
   ```bash
   pnpm test
   ```

2. **Check test coverage**:
   ```bash
   pnpm test -- --coverage
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