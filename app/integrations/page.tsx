'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	ArrowLeft,
	BarChart2,
	Heart,
	Plus,
	PowerIcon as Pulse,
	Trash2,
	Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Device = {
	id: string;
	name: string;
	type: string;
	lastSync: string;
	connected: boolean;
};

export default function IntegrationsPage() {
	const [devices, setDevices] = useState<Device[]>([
		{
			id: '1',
			name: 'Apple Watch Series 8',
			type: 'smartwatch',
			lastSync: '10 minutes ago',
			connected: true,
		},
		{
			id: '2',
			name: 'Fitbit Charge 5',
			type: 'fitness-tracker',
			lastSync: '2 hours ago',
			connected: true,
		},
		{
			id: '3',
			name: 'Withings Blood Pressure Monitor',
			type: 'blood-pressure',
			lastSync: 'Yesterday',
			connected: false,
		},
	]);

	const [newDevice, setNewDevice] = useState({
		name: '',
		type: 'smartwatch',
	});

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleAddDevice = () => {
		const device = {
			id: Date.now().toString(),
			name: newDevice.name,
			type: newDevice.type,
			lastSync: 'Just now',
			connected: true,
		};

		setDevices([...devices, device]);
		setNewDevice({
			name: '',
			type: 'smartwatch',
		});
		setIsDialogOpen(false);
	};

	const handleRemoveDevice = (id: string) => {
		setDevices(devices.filter((device) => device.id !== id));
	};

	const getDeviceIcon = (type: string) => {
		switch (type) {
			case 'smartwatch':
				return <Zap className='h-5 w-5' />;
			case 'fitness-tracker':
				return <Pulse className='h-5 w-5' />;
			case 'blood-pressure':
				return <Heart className='h-5 w-5' />;
			default:
				return <Zap className='h-5 w-5' />;
		}
	};

	return (
		<>
			<div className='flex min-h-screen flex-col'>
				{/* Navigation */}
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

				<div className='container py-8 md:py-12'>
					<div className='flex items-center justify-between mb-8'>
						<div className='flex items-center'>
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
							<h1 className='text-3xl font-bold'>Device Integrations</h1>
						</div>

						<Dialog
							open={isDialogOpen}
							onOpenChange={setIsDialogOpen}
						>
							<DialogTrigger asChild>
								<Button className='flex items-center gap-2'>
									<Plus className='h-4 w-4' /> Add Device
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Connect New Device</DialogTitle>
									<DialogDescription>
										Add a new health tracking device to your account
									</DialogDescription>
								</DialogHeader>

								<div className='grid gap-4 py-4'>
									<div className='grid grid-cols-4 items-center gap-4'>
										<Label
											htmlFor='device-name'
											className='text-right'
										>
											Device Name
										</Label>
										<Input
											id='device-name'
											value={newDevice.name}
											onChange={(e) =>
												setNewDevice({ ...newDevice, name: e.target.value })
											}
											className='col-span-3'
										/>
									</div>

									<div className='grid grid-cols-4 items-center gap-4'>
										<Label
											htmlFor='device-type'
											className='text-right'
										>
											Device Type
										</Label>
										<Select
											value={newDevice.type}
											onValueChange={(value) =>
												setNewDevice({ ...newDevice, type: value })
											}
										>
											<SelectTrigger
												id='device-type'
												className='col-span-3'
											>
												<SelectValue placeholder='Select device type' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='smartwatch'>Smartwatch</SelectItem>
												<SelectItem value='fitness-tracker'>
													Fitness Tracker
												</SelectItem>
												<SelectItem value='blood-pressure'>
													Blood Pressure Monitor
												</SelectItem>
												<SelectItem value='glucose'>Glucose Monitor</SelectItem>
												<SelectItem value='scale'>Smart Scale</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<DialogFooter>
									<Button
										variant='outline'
										onClick={() => setIsDialogOpen(false)}
									>
										Cancel
									</Button>
									<Button onClick={handleAddDevice}>Connect Device</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<div className='mx-auto max-w-5xl'>
						<Tabs
							defaultValue='devices'
							className='w-full'
						>
							<TabsList className='grid w-full grid-cols-2'>
								<TabsTrigger value='devices'>Connected Devices</TabsTrigger>
								<TabsTrigger value='data'>Health Data</TabsTrigger>
							</TabsList>

							<TabsContent
								value='devices'
								className='pt-6'
							>
								<Card>
									<CardHeader>
										<CardTitle>Connected Health Devices</CardTitle>
										<CardDescription>
											Manage your connected health tracking devices
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className='space-y-4'>
											{devices.length > 0 ? (
												devices.map((device) => (
													<Card
														key={device.id}
														className='overflow-hidden'
													>
														<div className='flex p-4'>
															<div className='mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
																{getDeviceIcon(device.type)}
															</div>
															<div className='flex-1'>
																<div className='flex items-center justify-between'>
																	<h3 className='font-medium'>{device.name}</h3>
																	<div className='flex items-center'>
																		<span
																			className={`mr-2 h-2 w-2 rounded-full ${
																				device.connected
																					? 'bg-green-500'
																					: 'bg-gray-300'
																			}`}
																		></span>
																		<span className='text-sm text-muted-foreground'>
																			{device.connected
																				? 'Connected'
																				: 'Disconnected'}
																		</span>
																	</div>
																</div>
																<p className='text-sm text-muted-foreground'>
																	Last synced: {device.lastSync}
																</p>
															</div>
															<Button
																variant='ghost'
																size='icon'
																className='ml-2 text-muted-foreground hover:text-destructive'
																onClick={() => handleRemoveDevice(device.id)}
															>
																<Trash2 className='h-4 w-4' />
															</Button>
														</div>
													</Card>
												))
											) : (
												<div className='flex flex-col items-center justify-center py-12 text-center'>
													<Zap className='mb-2 h-12 w-12 text-muted-foreground' />
													<p className='text-lg font-medium'>
														No devices connected
													</p>
													<p className='text-muted-foreground'>
														Connect your first health device to start tracking
														your health data
													</p>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent
								value='data'
								className='pt-6'
							>
								<Card>
									<CardHeader>
										<CardTitle>Health Data Dashboard</CardTitle>
										<CardDescription>
											View your health metrics collected from connected devices
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											<Card>
												<CardHeader className='pb-2'>
													<div className='flex items-center justify-between'>
														<CardTitle className='text-lg'>
															Heart Rate
														</CardTitle>
														<BarChart2 className='h-4 w-4 text-muted-foreground' />
													</div>
													<CardDescription>Average: 72 bpm</CardDescription>
												</CardHeader>
												<CardContent className='h-[200px] flex items-center justify-center'>
													<div className='w-full h-full bg-muted rounded-md flex items-center justify-center'>
														<p className='text-muted-foreground'>
															Heart rate chart visualization
														</p>
													</div>
												</CardContent>
											</Card>

											<Card>
												<CardHeader className='pb-2'>
													<div className='flex items-center justify-between'>
														<CardTitle className='text-lg'>Steps</CardTitle>
														<BarChart2 className='h-4 w-4 text-muted-foreground' />
													</div>
													<CardDescription>Today: 8,432 steps</CardDescription>
												</CardHeader>
												<CardContent className='h-[200px] flex items-center justify-center'>
													<div className='w-full h-full bg-muted rounded-md flex items-center justify-center'>
														<p className='text-muted-foreground'>
															Steps chart visualization
														</p>
													</div>
												</CardContent>
											</Card>

											<Card>
												<CardHeader className='pb-2'>
													<div className='flex items-center justify-between'>
														<CardTitle className='text-lg'>Sleep</CardTitle>
														<BarChart2 className='h-4 w-4 text-muted-foreground' />
													</div>
													<CardDescription>Last night: 7h 20m</CardDescription>
												</CardHeader>
												<CardContent className='h-[200px] flex items-center justify-center'>
													<div className='w-full h-full bg-muted rounded-md flex items-center justify-center'>
														<p className='text-muted-foreground'>
															Sleep chart visualization
														</p>
													</div>
												</CardContent>
											</Card>

											<Card>
												<CardHeader className='pb-2'>
													<div className='flex items-center justify-between'>
														<CardTitle className='text-lg'>
															Blood Pressure
														</CardTitle>
														<BarChart2 className='h-4 w-4 text-muted-foreground' />
													</div>
													<CardDescription>Latest: 120/80 mmHg</CardDescription>
												</CardHeader>
												<CardContent className='h-[200px] flex items-center justify-center'>
													<div className='w-full h-full bg-muted rounded-md flex items-center justify-center'>
														<p className='text-muted-foreground'>
															Blood pressure chart visualization
														</p>
													</div>
												</CardContent>
											</Card>
										</div>

										<div className='mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-md'>
											<p className='text-sm text-blue-800 dark:text-blue-300'>
												This data is collected from your connected devices and
												is for informational purposes only. Always consult with
												a healthcare professional for medical advice.
											</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</>
	);
}
