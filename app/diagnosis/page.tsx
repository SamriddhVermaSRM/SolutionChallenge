'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import {
	ArrowLeft,
	Cloud,
	Droplet,
	Heart,
	Thermometer,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DiagnosisPage() {
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		symptoms: {
			primarySymptom: 'headache',
			duration: 'days',
			severity: 5,
			additional: {
				fever: false,
				cough: false,
				fatigue: false,
				nausea: false,
			},
		},
		environment: {
			temperature: 'moderate',
			humidity: 'moderate',
			airQuality: 'moderate',
			location: '',
		},
		lifestyle: {
			exerciseFrequency: 'moderate',
			dietType: 'balanced',
			sleepDuration: '7-8',
			stressLevel: 4,
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		console.log('Form Submission Data:');
		console.log('Symptoms:', {
			primarySymptom: formData.symptoms.primarySymptom,
			duration: formData.symptoms.duration,
			severity: formData.symptoms.severity,
			additionalSymptoms: formData.symptoms.additional,
		});
		console.log('Environment:', formData.environment);
		console.log('Lifestyle:', formData.lifestyle);

		setSubmitted(true);
	};

	return (
		<div className='flex min-h-screen flex-col'>
			{/* Navigation */}

			<div className='container py-8 md:py-12'>
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
					<h1 className='text-3xl font-bold'>AI Diagnosis</h1>
				</div>

				<div className='mx-auto max-w-4xl'>
					<Card className='mb-8'>
						<CardHeader>
							<CardTitle>Health Assessment</CardTitle>
							<CardDescription>
								Enter your symptoms and health data for an AI-powered
								preliminary assessment. This is not a substitute for
								professional medical advice.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{!submitted ? (
								<form
									onSubmit={handleSubmit}
									className='space-y-6'
								>
									<Tabs
										defaultValue='symptoms'
										className='w-full'
									>
										<TabsList className='grid w-full grid-cols-3'>
											<TabsTrigger value='symptoms'>Symptoms</TabsTrigger>
											<TabsTrigger value='environment'>Environment</TabsTrigger>
											<TabsTrigger value='lifestyle'>Lifestyle</TabsTrigger>
										</TabsList>

										<TabsContent
											value='symptoms'
											className='space-y-4 pt-4'
										>
											<div className='space-y-2'>
												<Label htmlFor='primary-symptom'>Primary Symptom</Label>
												<Select defaultValue='headache'>
													<SelectTrigger id='primary-symptom'>
														<SelectValue placeholder='Select symptom' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='headache'>Headache</SelectItem>
														<SelectItem value='fever'>Fever</SelectItem>
														<SelectItem value='cough'>Cough</SelectItem>
														<SelectItem value='fatigue'>Fatigue</SelectItem>
														<SelectItem value='nausea'>Nausea</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-2'>
												<Label htmlFor='symptom-duration'>Duration</Label>
												<Select defaultValue='days'>
													<SelectTrigger id='symptom-duration'>
														<SelectValue placeholder='Select duration' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='hours'>Hours</SelectItem>
														<SelectItem value='days'>Days</SelectItem>
														<SelectItem value='weeks'>Weeks</SelectItem>
														<SelectItem value='months'>Months</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-2'>
												<Label htmlFor='symptom-severity'>
													Severity (1-10)
												</Label>
												<Slider
													id='symptom-severity'
													defaultValue={[5]}
													max={10}
													step={1}
													className='py-4'
												/>
											</div>

											<div className='space-y-2'>
												<Label htmlFor='additional-symptoms'>
													Additional Symptoms
												</Label>
												<div className='grid grid-cols-2 gap-4'>
													<div className='flex items-center space-x-2'>
														<Switch id='symptom-fever' />
														<Label htmlFor='symptom-fever'>Fever</Label>
													</div>
													<div className='flex items-center space-x-2'>
														<Switch id='symptom-cough' />
														<Label htmlFor='symptom-cough'>Cough</Label>
													</div>
													<div className='flex items-center space-x-2'>
														<Switch id='symptom-fatigue' />
														<Label htmlFor='symptom-fatigue'>Fatigue</Label>
													</div>
													<div className='flex items-center space-x-2'>
														<Switch id='symptom-nausea' />
														<Label htmlFor='symptom-nausea'>Nausea</Label>
													</div>
												</div>
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
													<Select defaultValue='moderate'>
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
													<Select defaultValue='moderate'>
														<SelectTrigger>
															<SelectValue placeholder='Select humidity' />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value='dry'>
																Dry (Below 30%)
															</SelectItem>
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
													<Select defaultValue='moderate'>
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
														placeholder='City, Country'
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
													<Select defaultValue='moderate'>
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
													<Select defaultValue='balanced'>
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
													<Select defaultValue='7-8'>
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
														defaultValue={[4]}
														max={10}
														step={1}
														className='py-4'
													/>
												</div>
											</div>
										</TabsContent>
									</Tabs>

									<div className='flex justify-end'>
										<Button type='submit'>Generate Assessment</Button>
									</div>
								</form>
							) : (
								<div className='space-y-6'>
									<div className='rounded-lg border p-4'>
										<h3 className='text-lg font-medium mb-2'>
											Assessment Results
										</h3>
										<p className='text-sm text-muted-foreground mb-4'>
											Based on the information provided, here are the potential
											conditions that may match your symptoms:
										</p>

										<div className='space-y-4'>
											<div className='space-y-2'>
												<div className='flex items-center justify-between'>
													<span className='font-medium'>Tension Headache</span>
													<span className='text-sm'>78% match</span>
												</div>
												<Progress
													value={78}
													className='h-2'
												/>
												<p className='text-sm text-muted-foreground'>
													Common causes include stress, dehydration, and poor
													posture.
												</p>
											</div>

											<div className='space-y-2'>
												<div className='flex items-center justify-between'>
													<span className='font-medium'>Migraine</span>
													<span className='text-sm'>45% match</span>
												</div>
												<Progress
													value={45}
													className='h-2'
												/>
												<p className='text-sm text-muted-foreground'>
													Often triggered by environmental factors, stress, or
													certain foods.
												</p>
											</div>

											<div className='space-y-2'>
												<div className='flex items-center justify-between'>
													<span className='font-medium'>Sinus Headache</span>
													<span className='text-sm'>32% match</span>
												</div>
												<Progress
													value={32}
													className='h-2'
												/>
												<p className='text-sm text-muted-foreground'>
													Related to sinus inflammation, often accompanied by
													nasal congestion.
												</p>
											</div>
										</div>

										<div className='mt-6 p-3 bg-blue-50 dark:bg-blue-950 rounded-md'>
											<p className='text-sm font-medium text-blue-800 dark:text-blue-300'>
												Important: This is an AI-generated assessment for
												informational purposes only. Please consult with a
												healthcare professional for proper diagnosis and
												treatment.
											</p>
										</div>
									</div>

									<div className='flex justify-between'>
										<Button
											variant='outline'
											onClick={() => setSubmitted(false)}
										>
											Start Over
										</Button>
										<Link href='/suggestions'>
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
	);
}
