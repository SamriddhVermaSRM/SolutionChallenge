import Link from "next/link"
import { Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Nav() {
    return (
        <>
            <header className=" top-0 z-40 w-full border-b bg-background">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                    <div className="flex gap-6 md:gap-10">
                        <Link href="/" className="flex items-center space-x-2">
                            <Zap className="h-6 w-6 text-primary" />
                            <span className="inline-block font-bold">HealSync</span>
                        </Link>
                        <nav className="hidden gap-6 md:flex">
                            <Link
                                href="/diagnosis"
                                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Diagnosis
                            </Link>
                            <Link
                                href="/chat"
                                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Chat
                            </Link>
                            <Link
                                href="/history"
                                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Medical History
                            </Link>
                            <Link
                                href="/doctors"
                                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Doctors
                            </Link>
                            <Link
                                href="/alerts"
                                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Alerts
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <Button variant="outline" size="sm" className="hidden md:flex">
                            Sign In
                        </Button>
                        <Button size="sm" className="hidden md:flex">
                            <Link
                                href="/signup"
                                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Sign Up
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
        </>
    )

}