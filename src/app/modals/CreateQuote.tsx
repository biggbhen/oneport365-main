import { DatePickerComponent } from '@/components/datePicker/DatePickerComponent';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
	children: ReactNode;
}

const CreateDialog: React.FC<ModalProps> = ({ children }) => {
	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='outline' className='flex items-center'>
						{children}
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px] p-0'>
					<DialogHeader className='p-6 border-b'>
						<DialogTitle>Create New Quote</DialogTitle>
						<DialogDescription className='text-sm'>
							Enter quote name and time
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4 px-6'>
						<div className='grid'>
							<Label htmlFor='title' className='mb-1 font-normal text-xs'>
								Enter quote title
							</Label>
							<Input
								id='title'
								defaultValue='Exportation charges'
								className='col-span-3 placeholder:text-[#1F293780] border-[#E5E7EB]'
							/>
						</div>
					</div>
					<div className='px-6 py-4 flex gap-x-4 justify-between'>
						<div className='w-1/2'>
							<p className='text-xs mb-1'>Start Time</p>
							<DatePickerComponent />
						</div>
						<div className='w-1/2'>
							<p className='text-xs mb-1'>End Time</p>
							<DatePickerComponent />
						</div>
					</div>
					<div className='px-6 py-4'>
						<div>
							<Button type='submit' className='w-full text-white bg-[#007003]'>
								Create New Quote
							</Button>
						</div>
						<div>
							{' '}
							<Button type='submit' className='w-full bg-white text-[red]'>
								Cancel
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateDialog;
