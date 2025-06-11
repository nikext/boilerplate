# API Structure Documentation

This API follows a clean, layered architecture with clear separation of concerns.

## 📁 Directory Structure

```
src/
├── config/           # Configuration files
│   ├── index.ts      # App configuration
│   └── database.ts   # Database connection setup
├── controllers/      # Request handlers and business logic coordination
│   └── postController.ts
├── middleware/       # Express middleware
│   ├── errorHandler.ts    # Error handling and async wrapper
│   └── validation.ts      # Request validation middleware
├── routes/          # Route definitions
│   ├── index.ts     # Route exports
│   └── posts.ts     # Post routes
├── services/        # Business logic and data access
│   └── postService.ts
├── types/           # TypeScript type definitions
│   └── apiResponse.ts
├── utils/           # Utility functions
│   └── logger.ts    # Logging utility
└── index.ts         # Application entry point
```

## 🏗️ Architecture Layers

### 1. **Routes Layer** (`/routes`)

- Defines API endpoints
- Handles HTTP request routing
- Applies middleware (validation, authentication)
- Delegates to controllers

### 2. **Controllers Layer** (`/controllers`)

- Handles HTTP requests and responses
- Coordinates between services
- Manages request/response transformation
- Error handling for HTTP layer

### 3. **Services Layer** (`/services`)

- Contains business logic
- Handles data access and manipulation
- Database operations
- Core application functionality

### 4. **Configuration Layer** (`/config`)

- Application configuration
- Database connection management
- Environment-specific settings

### 5. **Middleware Layer** (`/middleware`)

- Request/response processing
- Validation, authentication, logging
- Error handling
- Cross-cutting concerns

## 🚀 Key Features

### ✅ **Separation of Concerns**

- Routes only handle routing
- Controllers manage HTTP logic
- Services handle business logic
- Clear, maintainable code structure

### ✅ **Error Handling**

- Centralized error handling middleware
- Consistent error response format
- Async error handling with `asyncHandler`

### ✅ **Validation**

- Request validation middleware
- Schema-based validation using Zod
- Type-safe request handling

### ✅ **Configuration Management**

- Centralized configuration
- Environment-based settings
- Easy to modify and extend

### ✅ **Database Management**

- Singleton database connection
- Centralized database access
- Clean separation from business logic

## 📝 Usage Examples

### Adding a New Route

1. **Create Service** (`/services/newService.ts`):

```typescript
export class NewService {
  async getData() {
    return await prisma.newModel.findMany();
  }
}
export const newService = new NewService();
```

2. **Create Controller** (`/controllers/newController.ts`):

```typescript
export class NewController {
  async getData(req: Request, res: Response) {
    const data = await newService.getData();
    res.json({ success: true, data });
  }
}
export const newController = new NewController();
```

3. **Create Route** (`/routes/new.ts`):

```typescript
import { Router } from "express";
import { newController } from "../controllers/newController";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();
router.get("/", asyncHandler(newController.getData.bind(newController)));
export { router as newRoutes };
```

4. **Register Route** (`/routes/index.ts`):

```typescript
export { newRoutes } from "./new";
```

5. **Use in Main App** (`/index.ts`):

```typescript
import { newRoutes } from "./routes";
app.use("/api/new", newRoutes);
```

## 🔧 Available Middleware

- `asyncHandler`: Wraps async functions for error handling
- `validateBody`: Validates request body against Zod schema
- `validateParams`: Validates URL parameters
- `validateQuery`: Validates query parameters
- `errorHandler`: Centralized error handling

## 📊 API Response Format

All API responses follow a consistent format:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## 🛡️ Best Practices

1. **Always use `asyncHandler`** for async route handlers
2. **Validate requests** using validation middleware
3. **Keep controllers thin** - delegate to services
4. **Use services for business logic** - keep them independent of HTTP
5. **Use proper error handling** - throw AppError for controlled errors
6. **Follow consistent naming** - use descriptive names
7. **Add proper TypeScript types** - maintain type safety

This structure provides a solid foundation for building scalable, maintainable APIs with clear separation of concerns and proper error handling.
