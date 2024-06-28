'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

type CalendarTableProps = {
	daysArray: any[];
};

const CalendarTable: React.FC<CalendarTableProps> = ({ daysArray }) => {
	const [currentDate] = useState(dayjs());
	const weeks = [];
	for (let i = 0; i < daysArray.length; i += 7) {
		weeks.push(daysArray.slice(i, i + 7));
	}

	// console.log(currentDate);
	return (
		<div className='relative overflow-x-auto'>
			<div className='w-full text-sm text-gray-500'>
				<div className='grid grid-cols-7'>
					{['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'].map(
						(day, index) => (
							<div
								className={`px-6 py-3 border border-r-0 last:border-r first:rounded-tl-lg last:rounded-tr-lg`}
								key={index}>
								{day}
							</div>
						)
					)}
				</div>
				<div className='grid'>
					{weeks.map((week, weekIndex) => (
						<div className='grid grid-cols-7' key={weekIndex}>
							{week.map((day, dayIndex) => (
								<div
									className={`px-6 py-4 min-h-[100px] group cursor-pointer whitespace-nowrap ${
										day && 'hover:bg-[#1F2937]'
									} ${day ? 'border border-b border-t' : ''}`}
									key={dayIndex}>
									<p
										className={`mb-6 ${day && 'group-hover:text-white'} ${
											currentDate?.date() === day?.date() &&
											'bg-[#005BC2] w-max text-white p-1 rounded-sm '
										}`}>
										{day ? day.date() : ''}
									</p>
									<p
										className={`text-xs mb-1 ${
											day && 'group-hover:text-white'
										}`}>
										{day ? '5 Quotes' : ''}
									</p>
									<p className='text-xs w-max px-1 rounded-[25px] bg-[#98FF9B40] group-hover:bg-white'>
										{day ? 'Total: $23,045.00' : ''}
									</p>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CalendarTable;
