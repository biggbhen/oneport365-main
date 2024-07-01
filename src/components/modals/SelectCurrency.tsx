import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import ngn from '../../app/assets/nigFlag.png';
import usd from '../../app/assets/usa-flag.png';
import { Checkbox } from '@/components/ui/checkbox';
import { BsInfoSquare } from 'react-icons/bs';

type Props = {
	children: ReactNode;
};

const SelectCurrency: React.FC<Props> = ({ children }) => {
	const [open, setOpen] = React.useState<boolean>(false);
	const [rate, setRate] = React.useState<string>('');
	const handleSave = () => {};
	return (
		<div>
			<Dialog open={open} onOpenChange={() => setOpen(!open)}>
				<DialogTrigger asChild>
					<Button
						variant='outline'
						className='flex items-center w-full bg-[#F3F4F6]'
						onClick={() => setOpen(true)}>
						{children}
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px] p-0'>
					<DialogHeader className='p-6 border-b'>
						<DialogTitle>Set Section Currency</DialogTitle>
						<DialogDescription className='text-sm'>
							Kindly set a currency and rate
						</DialogDescription>
					</DialogHeader>

					<div className='pt-4 px-6'>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Select currency' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='NGN' className='flex gap-x-2'>
									<Image
										src={ngn}
										alt='icon'
										width={20}
										height={20}
										className='inline mr-2'
									/>{' '}
									NGN
								</SelectItem>
								<SelectItem value='USD' className='flex gap-x-2'>
									<Image
										src={usd}
										alt='icon'
										width={20}
										height={20}
										className='inline mr-2'
									/>
									USD
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='px-6'>
						<p className='text-xs text-[#6B7280] mb-1'>
							Is this the base currency?
						</p>
						<div className='flex gap-4'>
							<div className='flex items-center space-x-2'>
								<Checkbox id='base_currency' />
								<label
									htmlFor='base_currency'
									className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
									Yes it is
								</label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox id='base_currency' />
								<label
									htmlFor='base_currency'
									className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
									No
								</label>
							</div>
						</div>
					</div>
					<div className='px-6 '>
						<p className='flex text-xs gap-x-4 text-[#005BC2]'>
							<BsInfoSquare size={20} />
							Note, Base currency is the currency the customer will make payment
							in.
						</p>
					</div>

					<div className='pt-4 px-6'>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Customers currency' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='NGN' className='flex gap-x-2'>
									<Image
										src={ngn}
										alt='icon'
										width={20}
										height={20}
										className='inline mr-2'
									/>{' '}
									NGN
								</SelectItem>
								<SelectItem value='USD' className='flex gap-x-2'>
									<Image
										src={usd}
										alt='icon'
										width={20}
										height={20}
										className='inline mr-2'
									/>
									USD
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='grid gap-4 px-6'>
						<div className='grid'>
							<Label htmlFor='rate' className='mb-1 font-normal text-xs'>
								Enter Rate
							</Label>
							<Input
								id='rate'
								value={rate}
								onChange={(e) => setRate(e.target.value)}
								className='col-span-3 placeholder:text-[#1F293780] border-[#E5E7EB]'
							/>
						</div>
					</div>

					<div className='px-6 py-4'>
						<Button
							type='submit'
							className='w-full text-white bg-[#007003]'
							onClick={() => handleSave()}>
							Set Section Currency
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SelectCurrency;
