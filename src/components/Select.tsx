import * as React from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export function SelectInput() {
	return (
		<Select>
			<SelectTrigger className='w-[180px] border-0'>
				<SelectValue placeholder='Select a unit' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value='kg'>per kilogram</SelectItem>
					<SelectItem value='g'>per gram</SelectItem>
					<SelectItem value='t'>per tonne</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
