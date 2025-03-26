import { Link } from "react-router-dom"
import { Zap } from "lucide-react"
import { Button } from "./ui/button"

interface NavigationProps {
  showBackButton?: boolean
  title?: string
}

export function Navigation({ showBackButton, title }: NavigationProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">HealthAssist AI</span>
          </Link>
          {!showBackButton && (
            <nav className="hidden gap-6 md:flex">
              <Link
                to="/diagnosis"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Diagnosis
              </Link>
              <Link
                to="/chat"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Chat
              </Link>
              <Link
                to="/history"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Medical History
              </Link>
              <Link
                to="/doctors"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Doctors
              </Link>
              <Link
                to="/alerts"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Alerts
              </Link>
            </nav>
          )}
        </div>
        {!showBackButton && (
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
            <Button size="sm" className="hidden md:flex">
              Sign Up
            </Button>
          </div>
        )}
        {showBackButton && title && (
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Back</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
        )}
      </div>
    </header>
  )
}

