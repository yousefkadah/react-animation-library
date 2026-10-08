import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/docs/components" className="mt-2 inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Browse components
      </Link>
    </div>
  )
}
