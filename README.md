# REMWaste - Skip Hire Application

A modern, responsive React application for skip hire services with professional architecture and dual view modes.

## Features

- **Dual View Modes**: Grid view for browsing all skips, Filter view for smart recommendations
- **Smart Filtering**: Intelligent dropdowns with real-time price updates
- **Responsive Design**: Mobile-first approach with grid layouts
- **Professional UI**: Dark theme with Tailwind CSS and Lucide React icons
- **API Integration**: Axios-based service layer with error handling

## Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **Vite** - Fast development and build tool

## Project Structure

```
src/
├── components/          # Reusable UI components
├── constants/          # Configuration and enums
├── hooks/             # Custom React hooks
├── services/          # API layer
├── utils/             # Business logic utilities
└── App.jsx           # Main application
```

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start development server**
   ```bash
   pnpm dev
   ```

3. **Build for production**
   ```bash
   pnpm build
   ```

## Key Components

- **ViewToggle** - Switch between Grid and Filter views
- **FilterView** - Smart filtering with dropdown controls
- **SkipCard** - Individual skip display component
- **Header** - Responsive step navigation

## API Integration

The application fetches skip data from the WeWantWaste API with proper error handling and loading states.

---

Built with professional frontend architecture standards.
