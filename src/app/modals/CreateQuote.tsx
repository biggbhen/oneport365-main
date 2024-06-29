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
import { ReactNode } from 'react';

interface ModalProps {
	children: ReactNode;
}

const CreateDialog: React.FC<ModalProps> = ({ children }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className='flex items-center'>
					{children}
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] p-0'>
				<DialogHeader className='p-6 border-b'>
					<DialogTitle>Create New Quote</DialogTitle>
					<DialogDescription>Enter quote name and time</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4 px-6'>
					<div className='grid'>
						<Label htmlFor='title' className='mb-2 font-normal'>
							Enter quote title
						</Label>
						<Input
							id='title'
							defaultValue='Exportation charges'
							className='col-span-3 placeholder:text-[#1F293780]'
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type='submit'>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateDialog;
