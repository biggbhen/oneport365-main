'use client';
import React, { use, useCallback, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';
import CalendarTable from './CalendarTable/CalendarTable';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchQuotesRequested } from '@/lib/features/features';

type CalendarProps = {};

const Calendar: React.FC<CalendarProps> = () => {
	const dispatch = useAppDispatch();
	const { quotes } = useAppSelector((state) => state.quotes);
	const [currentDate, setCurrentDate] = useState(dayjs());
	const startOfMonth = currentDate.startOf('month');
	const endOfMonth = currentDate.endOf('month');
	const daysInMonth = endOfMonth.date();
	const firstDayOfMonth = startOfMonth.day();
	const prevMonthEnd = startOfMonth.subtract(1, 'day');

	// Calculate how many days from the previous month need to be added
	const daysFromPrevMonth = firstDayOfMonth === 0 ? 0 : firstDayOfMonth;

	// Initialize the days array
	const daysArray: Array<{ date: dayjs.Dayjs | null; isPrevMonth: boolean }> =
		[];

	// Add days from the previous month
	for (let i = daysFromPrevMonth; i > 0; i--) {
		daysArray.push({
			date: prevMonthEnd.subtract(i - 1, 'day'),
			isPrevMonth: true,
		});
	}

	// Add days from the current month
	for (let i = 0; i < daysInMonth; i++) {
		daysArray.push({ date: startOfMonth.add(i, 'day'), isPrevMonth: false });
	}

	// Fill the rest of the array to complete the weeks
	while (daysArray.length % 7 !== 0) {
		daysArray.push({ date: null, isPrevMonth: false });
	}

	const handleNextMonth = useCallback(() => {
		setCurrentDate(currentDate.add(1, 'month'));
	}, [currentDate]);

	const handlePreviousMonth = useCallback(() => {
		setCurrentDate(currentDate.subtract(1, 'month'));
	}, [currentDate]);

	const currentMonth = currentDate.format('MMMM').toUpperCase();
	const currentYear = currentDate.format('YYYY');

	React.useEffect(() => {
		// Get the first day of the current month in ISO string format
		const startDate = currentDate.startOf('month').toISOString();

		// Get today's date in ISO string format
		const endDate = dayjs().toISOString();

		dispatch(fetchQuotesRequested(startDate, endDate));
	}, [dispatch, currentDate]);

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
							{currentMonth && currentMonth}{' '}
							<span className='text-[#00861E]'>
								{currentYear && currentYear}
							</span>
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
