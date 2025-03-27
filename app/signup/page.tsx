"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Cloud, Droplet, Heart, Thermometer, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DatePickerDemo from "@/components/ui/DatePickerDemo"


export default function DiagnosisPage() {
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        symptoms: {
            primarySymptom: "headache",
            duration: "days",
            severity: 5,
            additional: {
                fever: false,
                cough: false,
                fatigue: false,
                nausea: false
            }
        },
        environment: {
            temperature: "moderate",
            humidity: "moderate",
            airQuality: "moderate",
            location: ""
        },
        lifestyle: {
            exerciseFrequency: "moderate",
            dietType: "balanced",
            sleepDuration: "7-8",
            stressLevel: 4
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log("Form Submission Data:");
        console.log("Symptoms:", {
            primarySymptom: formData.symptoms.primarySymptom,
            duration: formData.symptoms.duration,
            severity: formData.symptoms.severity,
            additionalSymptoms: formData.symptoms.additional
        });
        console.log("Environment:", formData.environment);
        console.log("Lifestyle:", formData.lifestyle);

        setSubmitted(true)
    }

    return (
        <div className="flex min-h-screen flex-col">

            <div className="container py-8 md:py-12">
                

                <div className="mx-auto max-w-4xl">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Health Assessment</CardTitle>
                            <CardDescription>
                                Enter your personal details to create your account and access a seamless experience. Stay connected,
                                manage your profile, for better Results . Your information is secure, and we value your privacy.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Tabs defaultValue="symptoms" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="symptoms">Personal Information/ Symptoms</TabsTrigger>
                                        <TabsTrigger value="environment">Environment</TabsTrigger>
                                        <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="symptoms" className="space-y-4 pt-4">

                                        <div className="flex w-full gap-1.5">
                                            <div className="w-full gap-1.5 grid">
                                                <Label htmlFor="First-name">First Name</Label>
                                                <Input type="text" id="First-name" placeholder="First Name" />
                                            </div>
                                            <div className="w-full gap-1.5 grid">
                                                <Label htmlFor="Last-name">Last Name</Label>
                                                <Input type="text" id="Last-name" placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div className="w-full grid grid-cols-3 pb-4  ">
                                            <div>
                                                <Label htmlFor="Last-name" className="">Gender</Label>
                                                <div className="text-white flex gap-2">
                                                    <input type="radio" id="Boy" name="Gender" value="Boy" />
                                                    <label htmlFor="Boy">Boy</label>
                                                    <input type="radio" id="Girl" name="Gender" value="Girl" />
                                                    <label htmlFor="Boy">Girl</label>
                                                    <input type="radio" id="not-to-be-say" name="Gender" value="not-to-be-say" />
                                                    <label htmlFor="Boy">Not To Be Say</label>
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="DOB">Date of Birth </Label>
                                                <DatePickerDemo />
                                            </div>
                                            <div>
                                                <Label htmlFor="Last-name">phone.no</Label>
                                                <Input type="text" id="Last-name" placeholder="Phone.no" />
                                            </div>
                                        </div>
                                        <div className="grid w-fit max-w-sm items-center gap-1.5 mt-7">
                                            <Label htmlFor="picture">import your medical History if any</Label>
                                            <Input id="picture" type="file" />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="environment" className="space-y-4 pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="flex items-center gap-2">
                                                    <Thermometer className="h-4 w-4" /> Temperature
                                                </Label>
                                                <Select required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select temperature" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="cold">Cold (Below 50°F/10°C)</SelectItem>
                                                        <SelectItem value="moderate">Moderate (50-75°F/10-24°C)</SelectItem>
                                                        <SelectItem value="hot">Hot (Above 75°F/24°C)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="flex items-center gap-2">
                                                    <Droplet className="h-4 w-4" /> Humidity
                                                </Label>
                                                <Select required >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select humidity" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="dry">Dry (Below 30%)</SelectItem>
                                                        <SelectItem value="moderate">Moderate (30-60%)</SelectItem>
                                                        <SelectItem value="humid">Humid (Above 60%)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="flex items-center gap-2">
                                                    <Cloud className="h-4 w-4" /> Air Quality
                                                </Label>
                                                <Select required >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select air quality" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="good">Good</SelectItem>
                                                        <SelectItem value="moderate">Moderate</SelectItem>
                                                        <SelectItem value="poor">Poor</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input id="location" placeholder="City, Country" />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="lifestyle" className="space-y-4 pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="flex items-center gap-2">
                                                    <Heart className="h-4 w-4" /> Exercise Frequency
                                                </Label>
                                                <Select required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select frequency" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="sedentary">Sedentary (Rarely)</SelectItem>
                                                        <SelectItem value="light">Light (1-2 days/week)</SelectItem>
                                                        <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                                                        <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Diet Type</Label>
                                                <Select required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select diet" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="balanced">Balanced</SelectItem>
                                                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                                        <SelectItem value="vegan">Vegan</SelectItem>
                                                        <SelectItem value="keto">Keto</SelectItem>
                                                        <SelectItem value="paleo">Paleo</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Sleep Duration</Label>
                                                <Select required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select hours" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="<5">Less than 5 hours</SelectItem>
                                                        <SelectItem value="5-6">5-6 hours</SelectItem>
                                                        <SelectItem value="7-8">7-8 hours</SelectItem>
                                                        <SelectItem value=">8">More than 8 hours</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Stress Level (1-10)</Label>
                                                <Slider  defaultValue={[0]} max={10} step={1} className="py-4" />
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <div className="flex justify-end">
                                    <Button type="submit">Sign Up</Button>
                                </div>
                            </form>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

