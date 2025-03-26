"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, ArrowLeft, Bell, Calendar, Clock, Plus, Trash2, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Alert = {
  id: string
  title: string
  description: string
  time: string
  date: string
  priority: "high" | "medium" | "low"
  type: "medication" | "appointment" | "health"
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "Take Medication",
      description: "Loratadine 10mg",
      time: "8:00 AM",
      date: "Daily",
      priority: "high",
      type: "medication",
    },
    {
      id: "2",
      title: "Doctor Appointment",
      description: "Annual Physical with Dr. Johnson",
      time: "10:00 AM",
      date: "July 12, 2023",
      priority: "medium",
      type: "appointment",
    },
    {
      id: "3",
      title: "Drink Water",
      description: "Stay hydrated throughout the day",
      time: "Every 2 hours",
      date: "Daily",
      priority: "low",
      type: "health",
    },
  ])

  const [newAlert, setNewAlert] = useState({
    title: "",
    description: "",
    time: "",
    date: "",
    priority: "medium",
    type: "medication",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddAlert = () => {
    const alert = {
      id: Date.now().toString(),
      ...newAlert,
      priority: newAlert.priority as "high" | "medium" | "low",
      type: newAlert.type as "medication" | "appointment" | "health",
    }

    setAlerts([...alerts, alert])
    setNewAlert({
      title: "",
      description: "",
      time: "",
      date: "",
      priority: "medium",
      type: "medication",
    })
    setIsDialogOpen(false)
  }

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return ""
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Bell className="h-5 w-5" />
      case "appointment":
        return <Calendar className="h-5 w-5" />
      case "health":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">HealthAssist AI</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Health Alerts</h1>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>Set up a new health reminder or alert</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="alert-title"
                    value={newAlert.title}
                    onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="alert-description"
                    value={newAlert.description}
                    onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-time" className="text-right">
                    Time
                  </Label>
                  <Input
                    id="alert-time"
                    value={newAlert.time}
                    onChange={(e) => setNewAlert({ ...newAlert, time: e.target.value })}
                    placeholder="e.g., 8:00 AM, Every 2 hours"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="alert-date"
                    value={newAlert.date}
                    onChange={(e) => setNewAlert({ ...newAlert, date: e.target.value })}
                    placeholder="e.g., Daily, July 12, 2023"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-priority" className="text-right">
                    Priority
                  </Label>
                  <Select
                    value={newAlert.priority}
                    onValueChange={(value) => setNewAlert({ ...newAlert, priority: value })}
                  >
                    <SelectTrigger id="alert-priority" className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-type" className="text-right">
                    Type
                  </Label>
                  <Select value={newAlert.type} onValueChange={(value) => setNewAlert({ ...newAlert, type: value })}>
                    <SelectTrigger id="alert-type" className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAlert}>Save Alert</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>Your current health reminders and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <Card key={alert.id} className="overflow-hidden">
                      <div className="flex p-4">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          {getTypeIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{alert.title}</h3>
                            <Badge className={getPriorityColor(alert.priority)}>
                              {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                          <div className="mt-2 flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-3.5 w-3.5" />
                            <span>{alert.time}</span>
                            <span className="mx-1">•</span>
                            <span>{alert.date}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="mb-2 h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-medium">No alerts set</p>
                    <p className="text-muted-foreground">Create your first health alert to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

