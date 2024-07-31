'use client';
import React, { MutableRefObject, useRef, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { IoSunny } from 'react-icons/io5';
import { ImCancelCircle } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa6';
import CreateDialog from '@/app/modals/CreateQuote';
import QuoteDetailModal from '../quote-detail/detailModal';
import { useAppSelector } from '@/lib/hooks';

type CalendarTableProps = {
	daysArray: Array<{ date: dayjs.Dayjs | null; isPrevMonth: boolean }>;
};

const CalendarTable: React.FC<CalendarTableProps> = ({ daysArray }) => {
	const [currentDate] = useState(dayjs());
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [openDetailModal, setOpenDetailModal] = useState(false);

	const { quotes } = useAppSelector((state) => state.quotes);
	const [filteredQuotes, setFilteredQuotes] = useState(quotes);
	const [dateQuoteList, setDateQuoteList] = useState<any[]>([]);
	const [quotesByDay, setQuotesByDay] = useState<{ [key: string]: Quote[] }>(
		{}
	);

	const cancelRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

	const weeks = [];
	for (let i = 0; i < daysArray.length; i += 7) {
		weeks.push(daysArray.slice(i, i + 7));
	}

	const handleCancel = (event: MouseEvent) => {
		if (cancelRef.current && cancelRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	React.useEffect(() => {
		if (isOpen) {
			document.addEventListener('click', handleCancel);
		} else {
			document.removeEventListener('click', handleCancel);
		}

		return () => {
			document.removeEventListener('click', handleCancel);
		};
		// eslint-disable-next-line
	}, [isOpen]);

	React.useEffect(() => {
		if (!isOpen) {
			setIsAnimating(true);
			const timer = setTimeout(() => setIsAnimating(false), 500);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	const handleOpen = () => setIsOpen(true);

	const filterQuotesByMonth = () => {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		return quotes.filter((quote) => {
			const quoteDate = new Date(quote.quote_date);
			return quoteDate.getFullYear() === currentYear && quoteDate.getMonth();
		});
	};

	const mapQuotesToDays = (quotes: Quote[]): { [key: string]: Quote[] } => {
		const quotesByDay: any = {};
		quotes.forEach((quote) => {
			const date = new Date(quote.quote_date).toISOString().split('T')[0];
			if (!quotesByDay[date]) {
				quotesByDay[date] = [];
			}
			quotesByDay[date].push(quote);
		});
		return quotesByDay;
	};

	React.useEffect(() => {
		const filtered = filterQuotesByMonth();
		setFilteredQuotes(filtered);
		setQuotesByDay(mapQuotesToDays(filtered));
		// eslint-disable-next-line
	}, [quotes]);

	console.log(dateQuoteList);

	const items = (dateQuoteList: Quote[]) => {
		return dateQuoteList.slice(0, 5).map((quote, index) => (
			<div
				key={index}
				className='flex gap-x-2 hover:bg-[#D0F5FF] p-2 group cursor-pointer'
				onClick={() => setOpenDetailModal(!openDetailModal)}>
				<div className='border-[3px] border-[#374151] rounded-t-[25px] rounded-b-[25px]'></div>
				<div className='p-2 flex-grow'>
					<p className='flex gap-x-2 justify-between mb-2 text-xs'>
						<span className='text-[#D0F5FF] group-hover:text-[#005BC2]'>
							{quote.sections
								.reduce(
									(sum, section) =>
										sum +
										section.section_data.reduce(
											(dataSum, data) => dataSum + data.amount,
											0
										),
									0
								)
								.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
						</span>
						<span className='text-[#D0F5FF] bg-[#374151]'>
							{new Date(quote.quote_date).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</span>
					</p>
					<p className='text-[#3B82F6] text-xs'>{quote.quote_title}</p>
				</div>
			</div>
		));
	};

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
							{week.map(
								(
									day: { date: dayjs.Dayjs | null; isPrevMonth: boolean },
									dayIndex
								) => {
									if (!day.date) return null;
									const dayString = day.date.toISOString().split('T')[0];
									const dayQuotes = quotesByDay[dayString] || [];
									const totalAmount = dayQuotes.reduce((sum, quote) => {
										return (
											sum +
											quote.sections.reduce((sectionSum, section) => {
												return (
													sectionSum +
													section.section_data.reduce((dataSum, data) => {
														return dataSum + data.amount;
													}, 0)
												);
											}, 0)
										);
									}, 0);
									return (
										<div
											className={`px-6 py-4 min-h-[100px] group cursor-pointer whitespace-nowrap ${
												day && 'hover:bg-[#1F2937]'
											} ${day ? 'border' : ''}`}
											key={dayIndex}
											onClick={() => {
												if (day) {
													handleOpen();
													setDateQuoteList(dayQuotes);
												}
											}}>
											<p
												className={`mb-6 ${
													day.date && 'group-hover:text-white'
												} ${
													day?.date.format('DDMMYY').toUpperCase() ===
														currentDate.format('DDMMYY').toUpperCase() &&
													'bg-[#005BC2] w-max text-white py-1 px-[6px] rounded-sm '
												}`}>
												{day.date ? day.date.date() : ''}
											</p>
											<p
												className={`text-xs mb-1 ${
													day && 'group-hover:text-white'
												}`}>
												{`${dayQuotes.length | 0} Quotes`}
											</p>
											<p
												className={`text-xs w-max px-1 rounded-[25px] ${
													!day.isPrevMonth
														? 'bg-[#98FF9B40] group-hover:bg-white'
														: 'bg-[#E5E7EB] group-hover:bg-white'
												}`}>
												{day.date ? 'Total: $23,045.00' : ''}
											</p>
										</div>
									);
								}
							)}
						</div>
					))}
					{(isOpen || isAnimating) && (
						<div
							className={`absolute top-0 bottom-0 right-0 w-[320px] bg-[#1f2937] p-4 shadow-md z-10 ${
								isOpen ? 'animate-slideIn' : 'animate-slideOut'
							}`}>
							<div className='mb-4 flex flex-row-reverse'>
								<div ref={cancelRef}>
									<ImCancelCircle
										size={20}
										color='white'
										className='cursor-pointer'
									/>
								</div>
							</div>
							<div className='flex justify-between gap-x-4 mb-4'>
								<p className='text-[#3B82F6]'>
									<span className='font-bold'>TODAY</span> 2/5/2024
								</p>
								<p className='text-[#FFFFFFB2] flex gap-x-4 items-center'>
									55º/40º <IoSunny color='#FDE047' size={20} />
								</p>
							</div>
							<div className='flex flex-col gap-y-2'>
								{dateQuoteList.length > 0 ? (
									items(dateQuoteList)
								) : (
									<p className='text-center mb-4'>No quotes, add new quotes!</p>
								)}
								<CreateDialog>
									<FaPlus size={20} className='mr-2' />
									Add new quote
								</CreateDialog>
							</div>
							{/* detail modal */}
							<QuoteDetailModal
								isOpen={openDetailModal}
								onClose={() => {
									setOpenDetailModal(false);
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CalendarTable;
