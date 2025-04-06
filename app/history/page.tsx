'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	ArrowLeft,
	Calendar,
	Download,
	FileText,
	Share2,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export default function MedicalHistoryPage() {
	const [activeTab, setActiveTab] = useState('summary');

	return (
		<div className='flex min-h-screen flex-col'>
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
					<h1 className='text-3xl font-bold'>Medical History</h1>
				</div>

				<div className='mx-auto max-w-5xl'>
					<Card className='mb-8'>
						<CardHeader>
							<div className='flex items-center justify-between'>
								<div>
									<CardTitle>Your Health Records</CardTitle>
									<CardDescription>
										View and manage your medical history securely
									</CardDescription>
								</div>
								<div className='flex gap-2'>
									<Button
										variant='outline'
										size='sm'
										className='flex gap-1'
									>
										<Download className='h-4 w-4' /> Export
									</Button>
									<Button
										variant='outline'
										size='sm'
										className='flex gap-1'
									>
										<Share2 className='h-4 w-4' /> Share
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<Tabs
								defaultValue='summary'
								onValueChange={setActiveTab}
								className='w-full'
							>
								<TabsList className='grid w-full grid-cols-4'>
									<TabsTrigger value='summary'>Summary</TabsTrigger>
									<TabsTrigger value='diagnoses'>Diagnoses</TabsTrigger>
									<TabsTrigger value='medications'>Medications</TabsTrigger>
									<TabsTrigger value='visits'>Doctor Visits</TabsTrigger>
								</TabsList>

								<TabsContent
									value='summary'
									className='pt-6'
								>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<Card>
											<CardHeader className='pb-2'>
												<CardTitle className='text-lg'>
													Recent Diagnoses
												</CardTitle>
											</CardHeader>
											<CardContent>
												<ul className='space-y-2'>
													<li className='flex items-start gap-2'>
														<FileText className='h-5 w-5 text-primary mt-0.5' />
														<div>
															<p className='font-medium'>Seasonal Allergies</p>
															<p className='text-sm text-muted-foreground'>
																Diagnosed on May 15, 2023
															</p>
														</div>
													</li>
													<li className='flex items-start gap-2'>
														<FileText className='h-5 w-5 text-primary mt-0.5' />
														<div>
															<p className='font-medium'>Tension Headache</p>
															<p className='text-sm text-muted-foreground'>
																Diagnosed on March 3, 2023
															</p>
														</div>
													</li>
												</ul>
											</CardContent>
										</Card>

										<Card>
											<CardHeader className='pb-2'>
												<CardTitle className='text-lg'>
													Current Medications
												</CardTitle>
											</CardHeader>
											<CardContent>
												<ul className='space-y-2'>
													<li className='flex items-start gap-2'>
														<FileText className='h-5 w-5 text-primary mt-0.5' />
														<div>
															<p className='font-medium'>Loratadine 10mg</p>
															<p className='text-sm text-muted-foreground'>
																Once daily for allergies
															</p>
														</div>
													</li>
													<li className='flex items-start gap-2'>
														<FileText className='h-5 w-5 text-primary mt-0.5' />
														<div>
															<p className='font-medium'>Vitamin D 1000 IU</p>
															<p className='text-sm text-muted-foreground'>
																Once daily supplement
															</p>
														</div>
													</li>
												</ul>
											</CardContent>
										</Card>

										<Card>
											<CardHeader className='pb-2'>
												<CardTitle className='text-lg'>
													Upcoming Appointments
												</CardTitle>
											</CardHeader>
											<CardContent>
												<ul className='space-y-2'>
													<li className='flex items-start gap-2'>
														<Calendar className='h-5 w-5 text-primary mt-0.5' />
														<div>
															<p className='font-medium'>Annual Physical</p>
															<p className='text-sm text-muted-foreground'>
																July 12, 2023 at 10:00 AM
															</p>
														</div>
													</li>
													<li className='flex items-start gap-2'>
														<Calendar className='h-5 w-5 text-primary mt-0.5' />
														<div>
															<p className='font-medium'>Dental Checkup</p>
															<p className='text-sm text-muted-foreground'>
																August 3, 2023 at 2:30 PM
															</p>
														</div>
													</li>
												</ul>
											</CardContent>
										</Card>

										<Card>
											<CardHeader className='pb-2'>
												<CardTitle className='text-lg'>
													Health Metrics
												</CardTitle>
											</CardHeader>
											<CardContent>
												<ul className='space-y-2'>
													<li className='flex justify-between items-center'>
														<span className='text-sm'>Blood Pressure</span>
														<span className='font-medium'>120/80 mmHg</span>
													</li>
													<li className='flex justify-between items-center'>
														<span className='text-sm'>Heart Rate</span>
														<span className='font-medium'>72 bpm</span>
													</li>
													<li className='flex justify-between items-center'>
														<span className='text-sm'>Weight</span>
														<span className='font-medium'>165 lbs</span>
													</li>
													<li className='flex justify-between items-center'>
														<span className='text-sm'>BMI</span>
														<span className='font-medium'>24.2</span>
													</li>
												</ul>
											</CardContent>
										</Card>
									</div>
								</TabsContent>

								<TabsContent
									value='diagnoses'
									className='pt-6'
								>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Condition</TableHead>
												<TableHead>Diagnosed</TableHead>
												<TableHead>Doctor</TableHead>
												<TableHead>Status</TableHead>
												<TableHead className='text-right'>Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow>
												<TableCell className='font-medium'>
													Seasonal Allergies
												</TableCell>
												<TableCell>May 15, 2023</TableCell>
												<TableCell>Dr. Sarah Johnson</TableCell>
												<TableCell>Active</TableCell>
												<TableCell className='text-right'>
													<Button
														variant='ghost'
														size='sm'
													>
														View Details
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className='font-medium'>
													Tension Headache
												</TableCell>
												<TableCell>March 3, 2023</TableCell>
												<TableCell>Dr. Michael Chen</TableCell>
												<TableCell>Resolved</TableCell>
												<TableCell className='text-right'>
													<Button
														variant='ghost'
														size='sm'
													>
														View Details
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className='font-medium'>
													Common Cold
												</TableCell>
												<TableCell>November 12, 2022</TableCell>
												<TableCell>Dr. Sarah Johnson</TableCell>
												<TableCell>Resolved</TableCell>
												<TableCell className='text-right'>
													<Button
														variant='ghost'
														size='sm'
													>
														View Details
													</Button>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TabsContent>

								<TabsContent
									value='medications'
									className='pt-6'
								>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Medication</TableHead>
												<TableHead>Dosage</TableHead>
												<TableHead>Frequency</TableHead>
												<TableHead>Start Date</TableHead>
												<TableHead>End Date</TableHead>
												<TableHead className='text-right'>Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow>
												<TableCell className='font-medium'>
													Loratadine
												</TableCell>
												<TableCell>10mg</TableCell>
												<TableCell>Once daily</TableCell>
												<TableCell>May 15, 2023</TableCell>
												<TableCell>Ongoing</TableCell>
												<TableCell className='text-right'>
													<Button
														variant='ghost'
														size='sm'
													>
														View Details
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className='font-medium'>Vitamin D</TableCell>
												<TableCell>1000 IU</TableCell>
												<TableCell>Once daily</TableCell>
												<TableCell>January 10, 2023</TableCell>
												<TableCell>Ongoing</TableCell>
												<TableCell className='text-right'>
													<Button
														variant='ghost'
														size='sm'
													>
														View Details
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className='font-medium'>Ibuprofen</TableCell>
												<TableCell>400mg</TableCell>
												<TableCell>As needed</TableCell>
												<TableCell>March 3, 2023</TableCell>
												<TableCell>March 10, 2023</TableCell>
												<TableCell className='text-right'>
													<Button
														variant='ghost'
														size='sm'
													>
														View Details
													</Button>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TabsContent>

								<TabsContent
									value='visits'
									className='pt-6'
								>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Date</TableHead>
												<TableHead>Doctor</TableHead>
												<TableHead>Type</TableHead>
												<TableHead>Reason</TableHead>
												<TableHead className='text-right'>Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow>
												<TableCell className='font-medium'>
													May 15, 2023
												</TableCell>
												<TableCell>Dr. Sarah Johnson</TableCell>
												<TableCell>Allergy Specialist</TableCell>
												<TableCell>Seasonal allergies consultation</TableCell>
												<TableCell className='text-right'>
													<Button
														variant='ghost'
														size='sm'
													>
														View Details
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className='font-medium'>
													March 3, 2023
												</TableCell>
												<TableCell>Dr. Michael Chen</TableCell>
												<TableCell>Primary Care</TableCell>
												<TableCell>Headache evaluation</TableCell>
												<TableCell className='text-right'>
													<Button
														variant='ghost'
														size='sm'
													>
														View Details
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className='font-medium'>
													January 10, 2023
												</TableCell>
												<TableCell>Dr. Sarah Johnson</TableCell>
												<TableCell>Primary Care</TableCell>
												<TableCell>Annual physical</TableCell>
												<TableCell className='text-right'>
													<Button
														variant='ghost'
														size='sm'
													>
														View Details
													</Button>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
