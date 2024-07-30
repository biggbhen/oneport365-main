import * as React from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function CurrencySelect() {
	return (
		<Select>
			<SelectTrigger className='w-[180px] border-0'>
				<SelectValue placeholder='Select a unit' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value='nig'>Nig</SelectItem>
					<SelectItem value='usa'>Usa</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
