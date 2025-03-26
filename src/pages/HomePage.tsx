import { Link } from "react-router-dom"
import { ArrowRight, Bell, MessageSquare, PieChart, User } from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Navigation } from "../components/Navigation"
import { Footer } from "../components/Footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Your AI-Powered Healthcare Assistant
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Get personalized health insights, chat with our AI, and manage your medical history all in one place.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/chat">
                  <Button size="lg" className="gap-1">
                    Start Chat <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/diagnosis">
                  <Button size="lg" variant="outline">
                    Try AI Diagnosis
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">
                *For informational purposes only. Not a substitute for professional medical advice.
              </p>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-950 dark:to-gray-900 rounded-full opacity-70 blur-3xl"></div>
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Healthcare illustration"
                  className="relative z-10 mx-auto h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comprehensive Health Management
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Access all your health needs through our intuitive platform
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <PieChart className="h-12 w-12 text-primary mb-2" />
                <CardTitle>AI Diagnosis</CardTitle>
                <CardDescription>Get preliminary health insights based on your symptoms</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/diagnosis" className="w-full">
                  <Button variant="outline" className="w-full">
                    Try Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <MessageSquare className="h-12 w-12 text-primary mb-2" />
                <CardTitle>AI Chat</CardTitle>
                <CardDescription>Chat with our AI assistant about health concerns</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/chat" className="w-full">
                  <Button variant="outline" className="w-full">
                    Start Chat
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <User className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Medical History</CardTitle>
                <CardDescription>View and manage your health records securely</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/history" className="w-full">
                  <Button variant="outline" className="w-full">
                    View History
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <Bell className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Health Alerts</CardTitle>
                <CardDescription>Set reminders for medications and appointments</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/alerts" className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Alerts
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

