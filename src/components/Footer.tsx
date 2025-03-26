import { Link } from "react-router-dom"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">HealthAssist AI</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            For informational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link to="#" className="hover:underline">
            Terms
          </Link>
          <Link to="#" className="hover:underline">
            Privacy
          </Link>
          <Link to="#" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

