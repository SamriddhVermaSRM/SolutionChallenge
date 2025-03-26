"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Filter, MessageSquare, Search, Star, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Doctor = {
  id: string
  name: string
  specialty: string
  rating: number
  location: string
  available: boolean
  image: string
}

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialty, setSpecialty] = useState("all")

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Primary Care",
      rating: 4.8,
      location: "New York, NY",
      available: true,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      rating: 4.9,
      location: "Boston, MA",
      available: true,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Cardiology",
      rating: 4.7,
      location: "Chicago, IL",
      available: false,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialty: "Primary Care",
      rating: 4.6,
      location: "San Francisco, CA",
      available: true,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "5",
      name: "Dr. Aisha Patel",
      specialty: "Dermatology",
      rating: 4.9,
      location: "Austin, TX",
      available: true,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "6",
      name: "Dr. Robert Kim",
      specialty: "Neurology",
      rating: 4.5,
      location: "Seattle, WA",
      available: false,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialty = specialty === "all" || doctor.specialty === specialty

    return matchesSearch && matchesSpecialty
  })

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
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Find Doctors</h1>
        </div>

        <div className="mx-auto max-w-5xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search for Healthcare Providers</CardTitle>
              <CardDescription>Find and connect with qualified healthcare professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name, specialty, or location"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="Primary Care">Primary Care</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex p-6">
                      <div className="mr-4 flex-shrink-0">
                        <img
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <div className="mt-1 flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{doctor.rating}</span>
                        </div>
                        <p className="mt-1 text-sm">{doctor.location}</p>
                        <div className="mt-2">
                          {doctor.available ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Available Today
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              Next Available: Tomorrow
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex border-t">
                      <Button variant="ghost" className="flex-1 rounded-none py-6" asChild>
                        <Link href="#" className="flex items-center justify-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Schedule</span>
                        </Link>
                      </Button>
                      <div className="w-px bg-border" />
                      <Button variant="ghost" className="flex-1 rounded-none py-6" asChild>
                        <Link href="#" className="flex items-center justify-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>Chat</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium">No doctors found</p>
                <p className="text-muted-foreground">Try adjusting your search or filters to find more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

