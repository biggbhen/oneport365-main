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
			<SelectTrigger>
				<SelectValue
					placeholder='Select a unit'
					className='w-max border: 0px;'
				/>
			</SelectTrigger>
			<SelectContent className='w-max border-0'>
				<SelectGroup>
					<SelectItem value='kg'>per kilogram</SelectItem>
					<SelectItem value='g'>per gram</SelectItem>
					<SelectItem value='t'>per tonne</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
