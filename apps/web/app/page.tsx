import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Full-Stack TypeScript Boilerplate
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A modern, production-ready starter with Next.js, Node.js, TypeScript, 
            Prisma, Zod, PostgreSQL, Tailwind CSS, and shadCN UI components.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            View Docs
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">🚀 Next.js 14</h3>
            <p className="text-muted-foreground">
              Latest Next.js with App Router, Server Components, and TypeScript
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">🔒 Type Safety</h3>
            <p className="text-muted-foreground">
              End-to-end type safety with TypeScript and Zod validation
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">🗄️ Prisma ORM</h3>
            <p className="text-muted-foreground">
              Type-safe database access with PostgreSQL and migrations
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">🎨 Tailwind CSS</h3>
            <p className="text-muted-foreground">
              Beautiful, responsive design with Tailwind and shadCN components
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">⚡ Turbo Monorepo</h3>
            <p className="text-muted-foreground">
              Efficient monorepo setup with shared packages and caching
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">🐳 Docker Ready</h3>
            <p className="text-muted-foreground">
              Local development with Docker Compose for PostgreSQL
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 