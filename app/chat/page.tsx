"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mic, Send, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    fetch("/api/chat", {
      method: "POST",
    body: JSON.stringify({ question: input })})
    .then((res) => res.json())
    .then((data) => {console.log(data)})

    // Simulate bot response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        headache:
          "I'm sorry to hear you're experiencing a headache. Common causes include stress, dehydration, or lack of sleep. Try drinking water, resting in a dark room, and consider over-the-counter pain relievers if appropriate. If your headache is severe or persistent, please consult a healthcare professional.",
        cold: "For common cold symptoms, rest and hydration are key. Over-the-counter medications can help manage symptoms. Honey and warm liquids may soothe a sore throat. If symptoms worsen or last more than 10 days, consider consulting a doctor.",
        tired:
          "Feeling tired can be related to many factors including sleep quality, stress, diet, or underlying health conditions. Try improving your sleep hygiene, staying hydrated, and maintaining regular physical activity. If fatigue persists, it's worth discussing with a healthcare provider.",
        default:
          "Thank you for sharing. While I can provide general information, I recommend consulting with a healthcare professional for personalized medical advice. Is there anything specific you'd like to know about this condition?",
      }

      const lowercaseInput = input.toLowerCase()
      let responseText = botResponses.default

      // Check for keywords in the input
      Object.keys(botResponses).forEach((key) => {
        if (lowercaseInput.includes(key)) {
          responseText = botResponses[key]
        }
      })

      const botMessage: Message = {
        id: Date.now().toString(),
        content: responseText,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
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

      <div className="container flex flex-1 flex-col py-8 md:py-12">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">AI Health Chat</h1>
        </div>

        <Card className="flex flex-1 flex-col mx-auto w-full max-w-3xl">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="shrink-0">
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your health question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim()} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setInput("I have a headache")}>
                I have a headache
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("What should I do for a cold?")}>
                What should I do for a cold?
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("I'm always tired")}>
                I'm always tired
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              This AI assistant provides general health information only. For medical emergencies, please call emergency
              services immediately.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

