'use client';
import React, { MutableRefObject, useRef, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { IoSunny } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa6';
import CreateDialog from '@/app/modals/CreateQuote';

type CalendarTableProps = {
	daysArray: any[];
};

const CalendarTable: React.FC<CalendarTableProps> = ({ daysArray }) => {
	const [currentDate] = useState(dayjs());
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);

	const modalRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

	const weeks = [];
	for (let i = 0; i < daysArray.length; i += 7) {
		weeks.push(daysArray.slice(i, i + 7));
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	React.useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	React.useEffect(() => {
		if (!isOpen) {
			setIsAnimating(true);
			const timer = setTimeout(() => setIsAnimating(false), 500);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	const handleOpen = () => setIsOpen(true);

	const items = new Array(5).fill(null).map((_, index) => (
		<div key={index} className='flex gap-x-2'>
			<div className='border-[3px] border-[#374151] rounded-t-[25px] rounded-b-[25px]'></div>
			<div className='p-2 flex-grow'>
				<p className='flex gap-x-2 justify-between mb-2 text-xs'>
					<span className='text-[#D0F5FF]'>$2,450.00</span>
					<span className='text-[#D0F5FF] bg-[#374151]'>4:00PM</span>
				</p>
				<p className='text-[#3B82F6] text-xs'>
					Air Freight/ Ocean Freight/ CBT/ Haulage
				</p>
			</div>
		</div>
	));

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
				<div className='relative overflow-hidden'>
					{weeks.map((week, weekIndex) => (
						<div className='grid grid-cols-7' key={weekIndex}>
							{week.map((day, dayIndex) => (
								<div
									className={`px-6 py-4 min-h-[100px] group cursor-pointer whitespace-nowrap ${
										day && 'hover:bg-[#1F2937]'
									} ${day ? 'border border-b border-t' : ''}`}
									key={dayIndex}
									onClick={() => day && handleOpen()}>
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
					{(isOpen || isAnimating) && (
						<div
							ref={modalRef}
							className={`absolute top-0 bottom-0 right-0 w-[300px] bg-[#1f2937] p-4 shadow-md ${
								isOpen ? 'animate-slideIn' : 'animate-slideOut'
							}`}>
							<div className='flex justify-between gap-x-4 mb-4'>
								<p className='text-[#3B82F6]'>
									<span className='font-bold'>TODAY</span> 2/5/2024
								</p>
								<p className='text-[#FFFFFFB2] flex gap-x-4 items-center'>
									55º/40º <IoSunny color='#FDE047' size={20} />
								</p>
							</div>
							<div className='flex flex-col gap-y-4'>
								{items}
								<CreateDialog>
									<FaPlus size={20} className='mr-2' />
									Add new quote
								</CreateDialog>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CalendarTable;
