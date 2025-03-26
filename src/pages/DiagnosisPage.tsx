"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Progress } from "../components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Navigation } from "../components/Navigation"
import { Link } from "react-router-dom"

export default function DiagnosisPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // In a real app, this would send data to an API
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation showBackButton title="AI Diagnosis" />

      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Health Assessment</CardTitle>
              <CardDescription>
                Enter your symptoms and health data for an AI-powered preliminary assessment. This is not a substitute
                for professional medical advice.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Tabs defaultValue="symptoms" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                      <TabsTrigger value="environment">Environment</TabsTrigger>
                      <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                    </TabsList>

                    <TabsContent value="symptoms" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-symptom">Primary Symptom</Label>
                        <Select defaultValue="headache">
                          <SelectTrigger id="primary-symptom">
                            <SelectValue placeholder="Select symptom" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="headache">Headache</SelectItem>
                            <SelectItem value="fever">Fever</SelectItem>
                            <SelectItem value="cough">Cough</SelectItem>
                            <SelectItem value="fatigue">Fatigue</SelectItem>
                            <SelectItem value="nausea">Nausea</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="symptom-duration">Duration</Label>
                        <Select defaultValue="days">
                          <SelectTrigger id="symptom-duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="symptom-severity">Severity (1-10)</Label>
                        <Slider id="symptom-severity" defaultValue={[5]} max={10} step={1} className="py-4" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additional-symptoms">Additional Symptoms</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="symptom-fever" />
                            <Label htmlFor="symptom-fever">Fever</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="symptom-cough" />
                            <Label htmlFor="symptom-cough">Cough</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="symptom-fatigue" />
                            <Label htmlFor="symptom-fatigue">Fatigue</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="symptom-nausea" />
                            <Label htmlFor="symptom-nausea">Nausea</Label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Environment and Lifestyle tabs would be similar to the Next.js version */}
                    {/* ... */}
                  </Tabs>

                  <div className="flex justify-end">
                    <Button type="submit">Generate Assessment</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-2">Assessment Results</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Based on the information provided, here are the potential conditions that may match your symptoms:
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Tension Headache</span>
                          <span className="text-sm">78% match</span>
                        </div>
                        <Progress value={78} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Common causes include stress, dehydration, and poor posture.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Migraine</span>
                          <span className="text-sm">45% match</span>
                        </div>
                        <Progress value={45} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Often triggered by environmental factors, stress, or certain foods.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Sinus Headache</span>
                          <span className="text-sm">32% match</span>
                        </div>
                        <Progress value={32} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Related to sinus inflammation, often accompanied by nasal congestion.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        Important: This is an AI-generated assessment for informational purposes only. Please consult
                        with a healthcare professional for proper diagnosis and treatment.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Start Over
                    </Button>
                    <Link to="/suggestions">
                      <Button>View Suggestions</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

