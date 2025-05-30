# 🚀 Full-Stack TypeScript Boilerplate

A modern, production-ready boilerplate starter project with Next.js, Node.js, TypeScript, Prisma, Zod, PostgreSQL, Tailwind CSS, and shadCN UI.

## ✨ Features

- **🔧 Monorepo Setup**: Turborepo for efficient development and build caching
- **⚡ Next.js 14**: Latest Next.js with App Router and Server Components
- **🔒 Full Type Safety**: End-to-end TypeScript with Zod validation
- **🗄️ Database**: PostgreSQL with Prisma ORM (supports both local and Neon)
- **🎨 Modern UI**: Tailwind CSS with shadCN UI components
- **🔄 API**: RESTful Node.js API with Express
- **🐳 Docker**: Ready for local development with Docker Compose
- **📦 Shared Packages**: Reusable types and schemas across frontend/backend

## 📁 Project Structure

```
boilerplate/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # Node.js backend
├── packages/
│   ├── shared/           # Shared types and schemas
│   └── database/         # Prisma setup
├── package.json
├── turbo.json
└── docker-compose.yml
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker and Docker Compose (for local database)

### 1. Clone and Install

```bash
git clone <your-repo-url> boilerplate
cd boilerplate
npm install
```

### 2. Environment Setup

```bash
# Copy environment file
cp env.example .env

# For local development, the default settings in env.example work with Docker
# For production with Neon, update the DATABASE_URL and DIRECT_URL
```

### 3. Start Database (Local Development)

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Generate Prisma client and push schema
npm run db:generate
npm run db:push

# Seed database with sample data
cd packages/database
npm run db:seed
```

### 4. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

## 🗄️ Database Setup

### Local Development (Docker)

The project includes a `docker-compose.yml` with PostgreSQL setup:

```bash
# Start local database
docker-compose up -d

# Stop database
docker-compose down
```

### Production (Neon Database)

1. Create a [Neon](https://neon.tech) account
2. Create a new database
3. Copy the connection string
4. Update `.env` file:

```env
DATABASE_URL="postgresql://username:password@ep-example.us-east-1.aws.neon.tech/neondb"
DIRECT_URL="postgresql://username:password@ep-example.us-east-1.aws.neon.tech/neondb"
```

## 📚 Available Scripts

### Root Level
- `npm run dev` - Start all apps in development
- `npm run build` - Build all apps
- `npm run lint` - Lint all packages
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

### Individual Apps
```bash
# Frontend (apps/web)
cd apps/web
npm run dev        # Start Next.js dev server
npm run build      # Build for production
npm run start      # Start production server

# Backend (apps/api)  
cd apps/api
npm run dev        # Start API dev server
npm run build      # Build TypeScript
npm run start      # Start production server

# Database (packages/database)
cd packages/database
npm run db:seed    # Seed database
```

## 🏗️ Architecture

### Frontend (Next.js)
- **App Router**: Using the new Next.js 13+ app directory
- **Server Components**: For better performance
- **Tailwind CSS**: Utility-first CSS framework
- **shadCN UI**: High-quality accessible components
- **TypeScript**: Full type safety

### Backend (Node.js)
- **Express**: Web framework
- **TypeScript**: Full type safety
- **Zod**: Runtime validation
- **Prisma**: Type-safe database access
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security middleware

### Shared Packages
- **@boilerplate/shared**: Common types and Zod schemas
- **@boilerplate/database**: Prisma client and database utilities

## 🔧 Development

### Adding New Dependencies

```bash
# Add to specific app
npm install <package> --workspace=apps/web
npm install <package> --workspace=apps/api

# Add to shared package
npm install <package> --workspace=packages/shared
```

### Database Changes

```bash
# 1. Update schema in packages/database/prisma/schema.prisma
# 2. Generate new migration
cd packages/database
npx prisma migrate dev --name your_migration_name

# 3. Generate Prisma client
npm run db:generate
```

### Adding New API Routes

1. Create route file in `apps/api/src/routes/`
2. Add validation schemas in `packages/shared/schemas/`
3. Import and use in `apps/api/src/index.ts`

### Adding New UI Components

```bash
# Add shadCN component
cd apps/web
npx shadcn-ui@latest add button
```

## 🚢 Deployment

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set build command: `cd apps/web && npm run build`
3. Set environment variables

### Backend (Railway/Render)
1. Set build command: `cd apps/api && npm run build`
2. Set start command: `cd apps/api && npm run start`
3. Set environment variables

### Database (Neon)
1. Create Neon database
2. Update production environment variables
3. Run migrations: `npx prisma migrate deploy`

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
