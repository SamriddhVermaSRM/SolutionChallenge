'use client';

import type React from 'react';
import { Suspense, use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, Send, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StateSnapshot } from '@langchain/langgraph';
import ReactMarkdown from 'react-markdown';

type Message = {
	id: string;
	content: string;
	sender: string;
	// sender: 'user' | 'assistant' | 'system' | 'HumanMessage' | 'AIMessage';
	timestamp: Date;
};

interface ChatMessageProps {
	id: string;
	content: string;
	sender: string;
	timestamp: Date;
}

function ChatMessage({ id, content, sender, timestamp }: ChatMessageProps) {
	const isHuman = sender === 'HumanMessage';
	console.log(timestamp)
	if (sender === 'HumanMessage' || (sender === 'AIMessage' && content !== '')) {
		return (
			<div
				key={id}
				className={`flex ${isHuman ? 'justify-end' : 'justify-start'} mb-4 last:mb-0`}
			>
				{!isHuman && (
					<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
						<Zap className="w-4 h-4 text-primary" />
					</div>
				)}
				<div
					className={`max-w-[80%] rounded-lg px-4 py-3 ${isHuman
						? 'bg-primary text-primary-foreground'
						: 'bg-muted shadow-sm'
						}`}
				>
					<div className="text-sm leading-relaxed">
						<ReactMarkdown>{content}</ReactMarkdown>
						</div>
					<p
						className="text-xs opacity-70 mt-1.5"
						suppressHydrationWarning
					>
						{timestamp ? new Date(timestamp).toLocaleTimeString('en-IN', {
							hour: '2-digit',
							minute: '2-digit'
						}) : "Thinking..."
						}

					</p>
				</div>
				{isHuman && (
					<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-2">
						<span className="text-xs font-medium text-primary-foreground">You</span>
					</div>
				)}
			</div>
		);
	}

	return null;
}

export default function ChatPage() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<StateSnapshot>();

	useEffect(() => {
		fetch('/api/chat')
			.then((res) => res.json())
			.then((data) => {
				setMessages(data.reply);
			});
	}, []);

	const handleSend = () => {
		fetch('/api/chat')
			.then((res) => res.json())
			.then((data) => {
				setMessages(data.reply);
			});
		if (!input.trim()) return;
		fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({ question: input }),
		}).then(() => {
			fetch('/api/chat')
				.then((res) => res.json())
				.then((data) => {
					setMessages(data.reply);
				});
		});
		setInput('');
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSend();
		}
	};

	return (
		<div className='flex min-h-screen flex-col'>

			<div className='container flex flex-1 flex-col py-8 md:py-12'>
				<div className='flex items-center mb-8'>
					<Link
						href='/'
						className='mr-4'
					>
						<Button
							variant='ghost'
							size='icon'
						>
							<ArrowLeft className='h-4 w-4' />
						</Button>
					</Link>
					<h1 className='text-3xl font-bold'> Chat</h1>
				</div>

				<Card className='flex flex-1 flex-col mx-auto w-full max-w-3xl'>
					<div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
						<div className="flex flex-col gap-4">
							{messages?.values?.messages?.map((e: any, key: number, arr: any[]) => {
								const message: Message = {
									id: key.toString(),
									content: e.kwargs.content,
									sender: e.id[2],
									timestamp: e.kwargs.response_metadata.created_at,
								};
								if (message.sender === 'HumanMessage') {
									if (arr[key + 1]) {
										const d = new Date(arr[key + 1]?.kwargs.response_metadata.created_at);
										d.setSeconds(d.getSeconds() - 30);
										message.timestamp = d;
									}
								}
								return (
									<ChatMessage
										key={key}
										{...message}
									/>
								);
							})}
						</div>
					</div>

					<div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<div className="p-4">
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="icon"
									className="shrink-0 hover:bg-muted"
								>
									<Mic className="h-4 w-4" />
								</Button>
								<Input
									placeholder="Type your health question..."
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={handleKeyDown}
									className="flex-1 bg-muted/50"
								/>
								<Button
									size="icon"
									onClick={handleSend}
									disabled={!input.trim()}
									className="shrink-0"
								>
									<Send className="h-4 w-4" />
								</Button>
							</div>

							<div className="mt-4 flex flex-wrap gap-2">
								{["I have a headache", "What should I do for a cold?", "I'm always tired"].map((suggestion) => (
									<Button
										key={suggestion}
										variant="outline"
										size="sm"
										onClick={() => setInput(suggestion)}
										className="text-sm hover:bg-muted"
									>
										{suggestion}
									</Button>
								))}
							</div>

							<p className="text-xs text-muted-foreground mt-4 leading-normal">
								This AI assistant provides general health information only. For medical emergencies,
								please call emergency services immediately.
							</p>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}



