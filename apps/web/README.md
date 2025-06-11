# Frontend Application Documentation

This is a modern Next.js frontend application with a clean, scalable architecture designed for production deployment.

## 📁 Directory Structure

```
apps/web/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── posts/            # Feature-specific components
│       ├── PostCard.tsx
│       └── CreatePostForm.tsx
├── lib/                  # Core utilities and configurations
│   ├── api/             # API layer
│   │   ├── client.ts    # HTTP client
│   │   ├── types.ts     # Type definitions
│   │   ├── endpoints/   # API endpoints
│   │   └── index.ts     # Exports
│   ├── hooks/           # Custom React hooks
│   │   └── usePosts.ts
│   ├── config.ts        # App configuration
│   └── utils.ts         # Utility functions
├── .env.local           # Local environment variables
├── .env.example         # Environment template
└── README.md            # This file
```

## 🏗️ Architecture Features

### ✅ **Dynamic API Configuration**

- Environment-based API URL configuration
- Automatic switching between dev/prod endpoints
- Centralized configuration management

### ✅ **Type-Safe API Layer**

- Dedicated API client with error handling
- Type-safe request/response interfaces
- Automatic request/response transformation

### ✅ **Custom React Hooks**

- Data fetching with loading states
- Error handling and retry logic
- Optimistic updates

### ✅ **Reusable Components**

- Feature-based component organization
- Proper TypeScript interfaces
- Consistent UI patterns

### ✅ **Production Ready**

- Environment variable management
- Error boundaries and fallbacks
- Performance optimizations

## 🚀 Key Features

### **Dynamic API Client**

The API client automatically adapts to different environments:

```typescript
// Development: http://localhost:3001
// Production: https://your-api-domain.com
// Custom: NEXT_PUBLIC_API_URL environment variable
```

### **Type Safety**

Full TypeScript coverage with shared types:

```typescript
interface Post {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: string;
  author: User;
}
```

### **Error Handling**

Comprehensive error handling at every level:

```typescript
// API Client level
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// Hook level
const { posts, loading, error, refetch } = usePosts();

// Component level
if (error) {
  return <ErrorComponent onRetry={refetch} />;
}
```

## 📝 Usage Examples

### Adding a New API Endpoint

1. **Define Types** (`lib/api/types.ts`):

```typescript
export interface NewResource {
  id: string;
  name: string;
}
```

2. **Create API Service** (`lib/api/endpoints/newResource.ts`):

```typescript
export class NewResourceApi {
  async getAll(): Promise<ApiResponse<NewResource[]>> {
    return apiClient.get("/api/new-resource");
  }
}
```

3. **Create Hook** (`lib/hooks/useNewResource.ts`):

```typescript
export function useNewResource() {
  const [data, setData] = useState<NewResource[]>([]);
  // ... implementation
}
```

4. **Use in Component**:

```typescript
const { data, loading, error } = useNewResource();
```

### Environment Configuration

1. **Development** (`.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

2. **Production** (set in deployment platform):

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🛠️ Deployment Guide

### **Vercel (Recommended)**

1. Connect your GitHub repository
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your API endpoint
   - `NODE_ENV`: production
3. Deploy automatically

### **Docker**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### **Environment Variables Required**

- `NEXT_PUBLIC_API_URL`: Your backend API URL
- `NODE_ENV`: Environment (development/production)

## 🎯 Best Practices Implemented

1. **Separation of Concerns**: API, hooks, components are separated
2. **Error Boundaries**: Graceful error handling at component level
3. **Loading States**: Proper loading indicators and skeletons
4. **Type Safety**: Full TypeScript coverage
5. **Performance**: Optimized re-renders and data fetching
6. **Accessibility**: Proper ARIA labels and semantic HTML
7. **Responsive Design**: Mobile-first approach
8. **Production Ready**: Environment configuration and deployment setup

## 🔄 State Management

Currently using React's built-in state management:

- `useState` for local component state
- Custom hooks for data fetching
- Context API (if needed for global state)

For larger applications, consider:

- Zustand (lightweight)
- Redux Toolkit (complex state)
- TanStack Query (server state)

This architecture provides a solid foundation that can be easily extended and scales well for production applications.
