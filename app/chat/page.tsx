'use client';

import type React from 'react';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, Send, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StateSnapshot } from '@langchain/langgraph';

type Message = {
	id: string;
	content: string;
	sender: string;
	// sender: 'user' | 'assistant' | 'system' | 'HumanMessage' | 'AIMessage';
	timestamp: Date;
};

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
			<header className='sticky top-0 z-40 w-full border-b bg-background'>
				<div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
					<div className='flex gap-6 md:gap-10'>
						<Link
							href='/'
							className='flex items-center space-x-2'
						>
							<Zap className='h-6 w-6 text-primary' />
							<span className='inline-block font-bold'>HealthAssist AI</span>
						</Link>
					</div>
				</div>
			</header>

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
					<h1 className='text-3xl font-bold'>AI Health Chat</h1>
				</div>

				<Card className='flex flex-1 flex-col mx-auto w-full max-w-3xl'>
					<div className='flex-1 overflow-y-auto p-4 space-y-4'>
						{messages?.values.messages.map(
							(e: any, key: number, arr: any[]) => {
								const message: Message = {
									id: key.toString(),
									content: e.kwargs.content,
									sender: e.id[2],
									timestamp: e.kwargs.response_metadata.created_at,
								};
								if (message.sender === 'HumanMessage') {
									const d = new Date(
										arr[key + 1].kwargs.response_metadata.created_at
									);
									d.setSeconds(d.getSeconds() - 30);
									message.timestamp = d;
								}
								return (
									<Meow
										key={key}
										{...message}
									/>
								);
							}
						)}
					</div>

					<div className='border-t p-4'>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='icon'
								className='shrink-0'
							>
								<Mic className='h-4 w-4' />
							</Button>
							<Input
								placeholder='Type your health question...'
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								className='flex-1'
							/>
							<Button
								size='icon'
								onClick={handleSend}
								disabled={!input.trim()}
								className='shrink-0'
							>
								<Send className='h-4 w-4' />
							</Button>
						</div>

						<div className='mt-4 flex flex-wrap gap-2'>
							<Button
								variant='outline'
								size='sm'
								onClick={() => setInput('I have a headache')}
							>
								I have a headache
							</Button>
							<Button
								variant='outline'
								size='sm'
								onClick={() => setInput('What should I do for a cold?')}
							>
								What should I do for a cold?
							</Button>
							<Button
								variant='outline'
								size='sm'
								onClick={() => setInput("I'm always tired")}
							>
								I'm always tired
							</Button>
						</div>

						<p className='text-xs text-muted-foreground mt-4'>
							This AI assistant provides general health information only. For
							medical emergencies, please call emergency services immediately.
						</p>
					</div>
				</Card>
			</div>
		</div>
	);
}

function Meow(props: any) {
	console.log('waada');
	const message: Message = {
		id: props.id,
		content: props.content,
		sender: props.sender,
		timestamp: props.timestamp,
	};
	if (
		message.sender === 'HumanMessage' ||
		(message.sender === 'AIMessage' && message.content !== '')
	) {
		return (
			<>
				<div
					key={message.id}
					className={`flex ${
						message.sender === 'HumanMessage' ? 'justify-end' : 'justify-start'
					}`}
				>
					<div
						className={`max-w-[80%] rounded-lg px-4 py-2 ${
							message.sender === 'HumanMessage'
								? 'bg-primary text-primary-foreground'
								: 'bg-muted'
						}`}
					>
						<p className='text-sm'>{message.content}</p>
						<p
							className='text-xs opacity-70 mt-1'
							suppressHydrationWarning
						>
							{new Date(message.timestamp).toLocaleString('en-IN')}
						</p>
					</div>
				</div>
			</>
		);
	} else {
		return <></>;
	}
}
