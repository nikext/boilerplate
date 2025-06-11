# Cursor Guide for Full-Stack TypeScript Boilerplate

This guide provides specific instructions for working with this project in the Cursor editor.

## Project Setup

1. **Install Recommended Extensions**

   - Cursor TypeScript/JavaScript Language Features
   - Tailwind CSS IntelliSense
   - Prisma
   - ESLint

2. **Clone and Install**

   ```bash
   git clone <your-repo-url> boilerplate
   cd boilerplate
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```

## Development Workflow

### Running the Project

1. **Start Local Database**

   ```bash
   docker-compose up -d
   ```

2. **Generate Prisma Client and Push Schema**

   ```bash
   npm run db:generate
   npm run db:push
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

### Backend Hot-Reloading

The API server automatically restarts when files change using one of two methods:

1. **Default Method (tsx watch)**

   ```bash
   # From root directory
   npm run dev

   # Or from API directory
   cd apps/api
   npm run dev
   ```

2. **Alternative Method (nodemon)**
   ```bash
   # From API directory
   cd apps/api
   npm run dev:nodemon
   ```

The nodemon configuration watches:

- All TypeScript files in the `src` directory
- Changes to shared packages
- JSON configuration files

You don't need to manually restart the server when making code changes!

### Debugging in Cursor

1. **Frontend (Next.js)**

   - Open the Command Palette (`Ctrl+Shift+P`)
   - Select "Debug: Select and Start Debugging"
   - Choose "Next.js: debug web"

2. **Backend (Express)**
   - Open the Command Palette (`Ctrl+Shift+P`)
   - Select "Debug: Select and Start Debugging"
   - Choose "API: debug server"

## Code Style and Conventions

### TypeScript

- Use strict typing (no `any` unless absolutely necessary)
- Prefer interfaces over types for object shapes
- Use type inference where possible
- Always handle Promise rejections and errors

### React/Next.js

- Use function components with hooks
- Organize components in the following order:
  1. State declarations
  2. Effects
  3. Helper functions
  4. Return statement
- Use shadcn/ui components for UI elements
- Follow the file structure convention:
  - Page components in `app/` directory
  - Reusable components in `components/`
  - Utilities in `lib/`

### API Routes

- Group routes by feature
- Use Zod for request validation
- Always return structured responses
- Handle errors consistently

## Database Operations

- Always run migrations through Prisma
- Use the Prisma client for database operations
- Test database changes locally before committing

## Recommended Keyboard Shortcuts

| Action           | Shortcut       |
| ---------------- | -------------- |
| Format Document  | `Shift+Alt+F`  |
| Go to Definition | `F12`          |
| Find References  | `Shift+F12`    |
| Rename Symbol    | `F2`           |
| Quick Fix        | `Ctrl+.`       |
| Command Palette  | `Ctrl+Shift+P` |

## Turbo Commands

For efficient development, use these Turbo commands:

- `npm run dev` - Start all apps in development
- `npm run build` - Build all apps
- `npm run lint` - Lint all packages
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

## Project Structure Navigation

- **Frontend (`apps/web`)**:

  - `app/` - Next.js app directory
  - `components/` - UI components
  - `lib/` - Utility functions

- **Backend (`apps/api`)**:

  - `src/routes/` - API routes
  - `src/services/` - Business logic
  - `src/middleware/` - Express middleware

- **Shared Packages**:
  - `packages/database/` - Prisma setup
  - `packages/shared/` - Common types and schemas

## Best Practices

1. **Monorepo Organization**

   - Keep related code together
   - Share types and logic between packages

2. **Type Safety**

   - Use Zod for validation and type inference
   - Share types between frontend and backend

3. **Performance**

   - Use Next.js Server Components where appropriate
   - Optimize API responses

4. **Code Reviews**
   - Ensure type safety
   - Check for consistent error handling
   - Verify proper use of Prisma transactions
   - Confirm UI components follow design system
