'use client';

import type React from 'react';

import { FormEvent, FormEventHandler, useState } from 'react';
import { Cloud, Droplet, Heart, Thermometer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DiagnosisPage() {
	const [submitted, setSubmitted] = useState(false);
	const [selectDayPicker, setSelectDayPicker] = useState<Date>();
	const [formData, setFormData] = useState({
		infomation: {
			firstName: '',
			lastName: '',
			gender: '',
			dateOfBirth: '',
			phone: '',
		},
		environment: {
			temperature: '',
			humidity: '',
			airQuality: '',
			location: '',
		},
		lifestyle: {
			exerciseFrequency: '',
			dietType: '',
			sleepDuration: '',
			stressLevel: 0,
		},
	});

	const handleInformationChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		console.log(name, value);

		setFormData((prevData) => {
			return {
				...prevData,
				infomation: { ...prevData.infomation, [name]: value },
			};
		});
	};
	const handleEnvironmentChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		console.log(name, value);

		setFormData((prevData) => ({
			...prevData,
			environment: { ...prevData.environment, [name]: value },
		}));
	};

	const handleEnvironmentChangeTrig = (e: string, name: string) => {
		console.log(e);

		setFormData((prevData) => ({
			...prevData,
			environment: { ...prevData.environment, [name]: e },
		}));
	};

	const handleLifestyleChange = (e: string, name: string) => {
		console.log(e);

		setFormData((prevData) => ({
			...prevData,
			lifestyle: { ...prevData.lifestyle, [name]: e },
		}));
	};

	const handleSliderChange = (value: number[]) => {
		console.log(value[0]);

		setFormData((prevData) => ({
			...prevData,
			stressLevel: value[0],
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(e.target);
		localStorage.setItem('information', JSON.stringify(formData.infomation));
		localStorage.setItem('environment', JSON.stringify(formData.environment));
		localStorage.setItem('lifestyle', JSON.stringify(formData.lifestyle));
		// console.log(e.target.temperature.value);

		setSubmitted(true);
	};

	return (
		<div className='flex min-h-screen flex-col'>
			<div className='container py-8 md:py-12'>
				<div className='mx-auto max-w-4xl'>
					<Card className='mb-8'>
						<CardHeader>
							<CardTitle>Health Assessment</CardTitle>
							<CardDescription>
								Enter your personal details to create your account and access a
								seamless experience. Stay connected, manage your profile, for
								better Results . Your information is secure, and we value your
								privacy.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={handleSubmit}
								className='space-y-6'
							>
								<Tabs
									defaultValue='symptoms'
									className='w-full'
								>
									<TabsList className='grid w-full grid-cols-3'>
										<TabsTrigger value='symptoms'>
											Personal Information/ Symptoms
										</TabsTrigger>
										<TabsTrigger value='environment'>Environment</TabsTrigger>
										<TabsTrigger value='lifestyle'>Lifestyle</TabsTrigger>
									</TabsList>

									<TabsContent
										value='symptoms'
										className='space-y-4 pt-4'
									>
										<div className='flex w-full gap-1.5'>
											<div className='w-full gap-1.5 grid'>
												<Label htmlFor='First-name'>First Name</Label>
												<Input
													type='text'
													id='First-name'
													name='firstName'
													placeholder='First Name'
													onChange={handleInformationChange}
													value={formData.infomation.firstName}
												/>
											</div>
											<div className='w-full gap-1.5 grid'>
												<Label htmlFor='Last-name'>Last Name</Label>
												<Input
													type='text'
													id='Last-name'
													name='lastName'
													placeholder='Last Name'
													onChange={handleInformationChange}
													value={formData.infomation.lastName}
												/>
											</div>
										</div>
										<div className='w-full grid grid-cols-3 pb-4 gap-1.5 '>
											<div>
												<Label>Gender</Label>
												<div className='text-white flex gap-2'>
													<input
														type='radio'
														id='Boy'
														name='gender'
														value='Boy'
														onChange={handleInformationChange}
													/>
													<label htmlFor='Boy'>Boy</label>
													<input
														type='radio'
														id='Girl'
														name='gender'
														value='Girl'
														onChange={handleInformationChange}
													/>
													<label htmlFor='Boy'>Girl</label>
													<input
														type='radio'
														id='not-to-be-say'
														name='gender'
														value='not-to-be-say'
														onChange={handleInformationChange}
													/>
													<label htmlFor='Boy'>Not To Be Say</label>
												</div>
											</div>
											<div>
												<Label htmlFor='DOB'>Date of Birth </Label>
												<Input
													type='date'
													name='dateOfBirth'
													id='Date'
													onChange={handleInformationChange}
													value={formData.infomation.dateOfBirth}
												></Input>
											</div>
											<div>
												<Label htmlFor='Last-name'>phone.no</Label>
												<Input
													type='text'
													id='Last-name'
													name='phone'
													placeholder='Phone.no'
													onChange={handleInformationChange}
													value={formData.infomation.phone}
												/>
											</div>
										</div>
										<div className='grid w-fit max-w-sm items-center gap-1.5 mt-7'>
											<Label htmlFor='picture'>
												import your medical History if any
											</Label>
											<Input
												id='picture'
												type='file'
											/>
										</div>
									</TabsContent>

									<TabsContent
										value='environment'
										className='space-y-4 pt-4'
									>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div className='space-y-2'>
												<Label className='flex items-center gap-2'>
													<Thermometer className='h-4 w-4' /> Temperature
												</Label>
												<Select
													required
													name='temperature'
													onValueChange={(e) =>
														handleEnvironmentChangeTrig(e, 'temperature')
													}
													defaultValue={formData.environment.temperature}
												>
													<SelectTrigger>
														<SelectValue placeholder='Select temperature' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='cold'>
															Cold (Below 50°F/10°C)
														</SelectItem>
														<SelectItem value='moderate'>
															Moderate (50-75°F/10-24°C)
														</SelectItem>
														<SelectItem value='hot'>
															Hot (Above 75°F/24°C)
														</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-2'>
												<Label className='flex items-center gap-2'>
													<Droplet className='h-4 w-4' /> Humidity
												</Label>
												<Select
													required
													name='humidity'
													onValueChange={(e) =>
														handleEnvironmentChangeTrig(e, 'humidity')
													}
													defaultValue={formData.environment.humidity}
												>
													<SelectTrigger>
														<SelectValue placeholder='Select humidity' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='dry'>Dry (Below 30%)</SelectItem>
														<SelectItem value='moderate'>
															Moderate (30-60%)
														</SelectItem>
														<SelectItem value='humid'>
															Humid (Above 60%)
														</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-2'>
												<Label className='flex items-center gap-2'>
													<Cloud className='h-4 w-4' /> Air Quality
												</Label>
												<Select
													required
													name='airQuality'
													onValueChange={(e) =>
														handleEnvironmentChangeTrig(e, 'airQuality')
													}
													defaultValue={formData.environment.airQuality}
												>
													<SelectTrigger>
														<SelectValue placeholder='Select air quality' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='good'>Good</SelectItem>
														<SelectItem value='moderate'>Moderate</SelectItem>
														<SelectItem value='poor'>Poor</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-2'>
												<Label htmlFor='location'>Location</Label>
												<Input
													id='location'
													name='location'
													placeholder='City, Country'
													onChange={handleEnvironmentChange}
													defaultValue={formData.environment.location}
												/>
											</div>
										</div>
									</TabsContent>

									<TabsContent
										value='lifestyle'
										className='space-y-4 pt-4'
									>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div className='space-y-2'>
												<Label className='flex items-center gap-2'>
													<Heart className='h-4 w-4' /> Exercise Frequency
												</Label>
												<Select
													required
													name='exerciseFrequency'
													onValueChange={(e) =>
														handleLifestyleChange(e, 'exerciseFrequency')
													}
													defaultValue={formData.lifestyle.exerciseFrequency}
												>
													<SelectTrigger>
														<SelectValue placeholder='Select frequency' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='sedentary'>
															Sedentary (Rarely)
														</SelectItem>
														<SelectItem value='light'>
															Light (1-2 days/week)
														</SelectItem>
														<SelectItem value='moderate'>
															Moderate (3-5 days/week)
														</SelectItem>
														<SelectItem value='active'>
															Active (6-7 days/week)
														</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-2'>
												<Label>Diet Type</Label>
												<Select
													required
													name='dietType'
													onValueChange={(e) =>
														handleLifestyleChange(e, 'dietType')
													}
													defaultValue={formData.lifestyle.dietType}
												>
													<SelectTrigger>
														<SelectValue placeholder='Select diet' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='balanced'>Balanced</SelectItem>
														<SelectItem value='vegetarian'>
															Vegetarian
														</SelectItem>
														<SelectItem value='vegan'>Vegan</SelectItem>
														<SelectItem value='keto'>Keto</SelectItem>
														<SelectItem value='paleo'>Paleo</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-2'>
												<Label>Sleep Duration</Label>
												<Select
													required
													name='sleepDuration'
													onValueChange={(e) =>
														handleLifestyleChange(e, 'sleepDuration')
													}
													defaultValue={formData.lifestyle.sleepDuration}
												>
													<SelectTrigger>
														<SelectValue placeholder='Select hours' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='<5'>
															Less than 5 hours
														</SelectItem>
														<SelectItem value='5-6'>5-6 hours</SelectItem>
														<SelectItem value='7-8'>7-8 hours</SelectItem>
														<SelectItem value='>8'>
															More than 8 hours
														</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-2'>
												<Label>Stress Level (1-10)</Label>
												<Slider
													defaultValue={[formData.lifestyle.stressLevel]}
													max={10}
													step={1}
													className='py-4'
													onValueChange={handleSliderChange}
												/>
											</div>
										</div>
									</TabsContent>
								</Tabs>

								<div className='flex justify-end'>
									<Button type='submit'>Sign Up</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
