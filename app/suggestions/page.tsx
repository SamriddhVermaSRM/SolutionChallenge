"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Dumbbell, Salad, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SuggestionsPage() {
  const [savedSuggestions, setSavedSuggestions] = useState<string[]>([])

  const toggleSaveSuggestion = (id: string) => {
    if (savedSuggestions.includes(id)) {
      setSavedSuggestions(savedSuggestions.filter((item) => item !== id))
    } else {
      setSavedSuggestions([...savedSuggestions, id])
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
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Lifestyle Suggestions</h1>
        </div>

        <div className="mx-auto max-w-5xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Personalized Health Recommendations</CardTitle>
              <CardDescription>
                Based on your health profile and recent assessments, here are some suggestions to improve your
                wellbeing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="diet" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="diet">Diet</TabsTrigger>
                  <TabsTrigger value="exercise">Exercise</TabsTrigger>
                  <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                </TabsList>

                <TabsContent value="diet" className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      id="diet-1"
                      className={`transition-all ${savedSuggestions.includes("diet-1") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Salad className="h-5 w-5 text-green-500" />
                            <CardTitle className="text-lg">Hydration</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          >
                            Recommended
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Increase water intake to 8-10 glasses per day to help with headache prevention. Dehydration is
                          a common trigger for tension headaches.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("diet-1")}
                        >
                          {savedSuggestions.includes("diet-1") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card
                      id="diet-2"
                      className={`transition-all ${savedSuggestions.includes("diet-2") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Salad className="h-5 w-5 text-green-500" />
                            <CardTitle className="text-lg">Magnesium-Rich Foods</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          >
                            Recommended
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Include more magnesium-rich foods like dark leafy greens, nuts, seeds, and whole grains.
                          Magnesium can help prevent tension headaches and migraines.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("diet-2")}
                        >
                          {savedSuggestions.includes("diet-2") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card
                      id="diet-3"
                      className={`transition-all ${savedSuggestions.includes("diet-3") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Salad className="h-5 w-5 text-green-500" />
                            <CardTitle className="text-lg">Caffeine Moderation</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                          >
                            Consider
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Consider reducing caffeine intake, especially in the afternoon. While small amounts can help
                          with headaches, too much can trigger them or disrupt sleep.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("diet-3")}
                        >
                          {savedSuggestions.includes("diet-3") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card
                      id="diet-4"
                      className={`transition-all ${savedSuggestions.includes("diet-4") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Salad className="h-5 w-5 text-green-500" />
                            <CardTitle className="text-lg">Regular Meal Schedule</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          >
                            Recommended
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Maintain a regular eating schedule to avoid blood sugar fluctuations, which can trigger
                          headaches. Don't skip meals, especially breakfast.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("diet-4")}
                        >
                          {savedSuggestions.includes("diet-4") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="exercise" className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      id="exercise-1"
                      className={`transition-all ${savedSuggestions.includes("exercise-1") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Dumbbell className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">Neck Stretches</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          >
                            Recommended
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Perform gentle neck stretches throughout the day, especially if you work at a desk. This can
                          help reduce tension that contributes to headaches.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("exercise-1")}
                        >
                          {savedSuggestions.includes("exercise-1") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card
                      id="exercise-2"
                      className={`transition-all ${savedSuggestions.includes("exercise-2") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Dumbbell className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">Low-Impact Cardio</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          >
                            Recommended
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Engage in regular low-impact cardio like walking, swimming, or cycling for 30 minutes, 3-5
                          times per week. This can help reduce stress and improve sleep quality.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("exercise-2")}
                        >
                          {savedSuggestions.includes("exercise-2") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="lifestyle" className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      id="lifestyle-1"
                      className={`transition-all ${savedSuggestions.includes("lifestyle-1") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-purple-500" />
                            <CardTitle className="text-lg">Sleep Hygiene</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          >
                            Recommended
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Maintain a consistent sleep schedule, aiming for 7-8 hours per night. Create a dark, quiet
                          sleeping environment and avoid screens before bedtime.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("lifestyle-1")}
                        >
                          {savedSuggestions.includes("lifestyle-1") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card
                      id="lifestyle-2"
                      className={`transition-all ${savedSuggestions.includes("lifestyle-2") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-purple-500" />
                            <CardTitle className="text-lg">Stress Management</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          >
                            Recommended
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Practice stress-reduction techniques like deep breathing, meditation, or yoga. Chronic stress
                          is a common trigger for tension headaches.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("lifestyle-2")}
                        >
                          {savedSuggestions.includes("lifestyle-2") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card
                      id="lifestyle-3"
                      className={`transition-all ${savedSuggestions.includes("lifestyle-3") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-purple-500" />
                            <CardTitle className="text-lg">Screen Breaks</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          >
                            Recommended
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Take regular breaks from screens and digital devices. Follow the 20-20-20 rule: every 20
                          minutes, look at something 20 feet away for 20 seconds.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("lifestyle-3")}
                        >
                          {savedSuggestions.includes("lifestyle-3") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card
                      id="lifestyle-4"
                      className={`transition-all ${savedSuggestions.includes("lifestyle-4") ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-purple-500" />
                            <CardTitle className="text-lg">Posture Awareness</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          >
                            Recommended
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Be mindful of your posture, especially when working at a desk. Poor posture can lead to muscle
                          tension in the neck and shoulders, triggering headaches.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => toggleSaveSuggestion("lifestyle-4")}
                        >
                          {savedSuggestions.includes("lifestyle-4") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Saved
                            </>
                          ) : (
                            "Save Suggestion"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  These suggestions are personalized based on your health profile and recent assessments. They are for
                  informational purposes only and not a substitute for professional medical advice. Always consult with
                  a healthcare provider before making significant changes to your diet or exercise routine.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

