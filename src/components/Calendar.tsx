'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';
import CalendarTable from './CalendarTable/CalendarTable';

type CalendarProps = {};

const Calendar: React.FC<CalendarProps> = () => {
	const [currentDate, setCurrentDate] = useState(dayjs());

	const startOfMonth = currentDate.startOf('month');
	const endOfMonth = currentDate.endOf('month');
	const daysInMonth = endOfMonth.date();
	const firstDayOfMonth = startOfMonth.day();

	const daysArray: Array<dayjs.Dayjs | null> = new Array(firstDayOfMonth).fill(
		null
	);

	for (let i = 0; i < daysInMonth; i++) {
		daysArray.push(startOfMonth.add(i, 'day'));
	}

	while (daysArray.length % 7 !== 0) {
		daysArray.push(null);
	}

	const handleNextMonth = () => {
		setCurrentDate(currentDate.add(1, 'month'));
	};

	const handlePreviousMonth = () => {
		setCurrentDate(currentDate.subtract(1, 'month'));
	};

	return (
		<div className='px-8 mb-8'>
			<div className='flex justify-between p-4 mb-6'>
				<div>
					<h2 className='font-semibold text-xl'>All Existing Quotes</h2>
					<p className='text-xs text-[#6B7280]'>View all created quotes</p>
				</div>
				<div className='flex gap-x-4 items-center'>
					<div>
						<p className='text-xl'>
							May <span className='text-[#00861E]'>2024</span>
						</p>
					</div>
					<div className='flex items-center gap-x-2'>
						<button onClick={handlePreviousMonth}>
							<FaAngleLeft />
						</button>
						<button onClick={handleNextMonth}>
							<FaAngleRight />
						</button>
					</div>
				</div>
			</div>
			<CalendarTable daysArray={daysArray} />
		</div>
	);
};

export default Calendar;
