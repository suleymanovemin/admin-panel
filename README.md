# Admin Panel Project

This project is an admin panel developed using React, TypeScript, and Vite. It is powered by modern UI libraries, efficient data management, and a fast development experience.

## Table of Contents
- [Setup & Running](#setup--running)
- [Main Dependencies](#main-dependencies)
- [Data Structure & Source](#data-structure--source)
- [Project Structure](#project-structure)
- [Features](#features)

---

## Setup & Running

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd admin-panel
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open your browser and go to `http://localhost:5173` to view the project.

**To build the project:**
```bash
npm run build
```

**To preview the production build:**
```bash
npm run preview
```

## Main Dependencies

- **React** (`^19.x`): UI development
- **TypeScript**: Type safety
- **Vite**: Fast development and build tool
- **@mui/material** & **@mui/icons-material**: Modern and accessible UI components
- **TailwindCSS**: Utility-first CSS framework
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form & @hookform/resolvers**: Form management and validation
- **primereact**: Additional UI components
- **lexical & quill**: Rich text editors
- **react-router-dom**: Routing
- **eslint**: Code quality and linting

For the full list of dependencies, check the `package.json` file.

## Data Structure & Source

- The project uses `public/data.json` as the data source for posts in demo and development environments.
- Instead of a real backend, mock services and a local JSON file are used for post and content operations.
- See `src/services/postService.ts` for mock functions handling fetching, adding, and updating posts.
- For real API integration, update the service functions accordingly.

## Project Structure

```
admin-panel/
├── public/
│   └── data.json           # Demo data
├── src/
│   ├── components/         # UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # Mock services and data operations
│   ├── types/              # Type definitions
│   ├── main.tsx            # App entry point
│   └── ...
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## Features

- Add, edit, delete posts (with mock services)
- Filtering by category and status
- Rich text editor support (Lexical, Quill)
- Ready infrastructure for multi-language (AZ/EN)
- Modern, responsive, and accessible UI
- Fast, cached data management with React Query
- Easily customizable theme with TailwindCSS

---

For issues or contributions, please open an issue or submit a pull request.
