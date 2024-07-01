'use client';
import React, { useState } from 'react';
import { DatePickerWithRange } from './datePicker/DateRange';
import { SelectInput } from './Select';
import { MdAddBox } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import Image from 'next/image';
import usFlag from '../app/assets/usa-flag.png';
import { CgArrowsExchange } from 'react-icons/cg';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button } from './ui/button';
import { addSectionToQuote, addTestSection } from '@/lib/features/features';
import { useLocalStorage } from '@/lib/features/actions';

type Props = {};

// Utility function to get the quote from localStorage
const getQuoteFromLocalStorage = () => {
	if (typeof window !== 'undefined') {
		const quote = localStorage.getItem('quote');
		return quote ? JSON.parse(quote) : null;
	}
	return null;
};

const GenerateQuote: React.FC<Props> = ({}) => {
	const dispatch = useAppDispatch();
	const [sectionList, setSectionList] = useState<any>([
		{
			section_name: '',
			section_number: 0,
			section_currency: {
				currency: 'NGN',
				exchange_rate: 100.45,
				is_base_currency: true,
				customer_currency: 'USD',
			},
			section_data: [],
			editable: true,
		},
	]);

	const [quoteLs, setQuoteLs] = useState<{
		quote_title: string;
		quote_date: string;
		sections: any[];
	} | null>(null);

	React.useEffect(() => {
		const quoteFromStorage = getQuoteFromLocalStorage();
		setQuoteLs(quoteFromStorage);
	}, []);

	const [quoteInput, setQuoteInput] = useState<SectionData>({
		basis: '',
		unit_of_measurement: 'kilogram',
		unit: 0,
		rate: 0,
		amount: 0,
	});

	const handleSectionLabel = (e: any, idx: any) => {
		setSectionList(
			sectionList.map((item: any) =>
				item.section_number.toString() === idx.toString()
					? { ...item, section_name: e.target.value }
					: item
			)
		);
	};

	const handleQuoteInput = (e: any) => {
		setQuoteInput({ ...quoteInput, [e.target.name]: e.target.value });
	};

	const handleAddQuote = (idx: any) => {
		const isEditable = sectionList.filter(
			(item: any) => item.section_number === idx && item.editable
		);

		if (isEditable.length <= 0) {
			setSectionList(
				sectionList.map((item: any) =>
					item.section_number.toString() === idx.toString()
						? { ...item, editable: true }
						: item
				)
			);
		} else {
			setSectionList(
				sectionList.map((item: any) => {
					const arr = { ...quoteInput, _id: item.section_data.length };
					const newArr = [...item.section_data, arr];
					if (item.section_number === idx) {
						return {
							...item,
							section_data: newArr,
						};
					} else {
						return item;
					}
				})
			);
			setQuoteInput({
				basis: '',
				unit_of_measurement: '',
				unit: 0,
				rate: 0,
				amount: 0,
			});
		}
	};

	const handleAddSection = () => {
		setSectionList([
			...sectionList.map((item: any) => {
				return { ...item, editable: false };
			}),
			{
				// _id: '666e597045f4385cd91ea352',
				section_name: '',
				section_number: sectionList.length,
				section_currency: {
					currency: 'NGN',
					exchange_rate: 100.45,
					is_base_currency: true,
					customer_currency: 'USD',
				},
				section_data: [],
				editable: true,
			},
		]);
	};

	const handleCreate = () => {
		const new_Quote: QuoteUpdate = {
			...quoteLs,
			sections: sectionList,
		};
		dispatch(addSectionToQuote(new_Quote));
		// console.log(new_Quote);
	};

	return (
		<div className='max-w-[83rem] mx-auto py-10'>
			<div className='flex justify-between space-x-8'>
				<div className='grow'>
					<div className='flex space-x-8 items-center'>
						<div className='relative overflow-x-auto w-full h-fit'>
							{sectionList.length > 0 &&
								sectionList.map((item: any, idx: number) => (
									<div key={idx}>
										<div className='flex space-x-8 mb-8' key={item._id}>
											<div className='grow'>
												<div className='border border-[#F3F4F6] shadow-sm h-fit'>
													{idx === 0 && (
														<div className='flex items-center'>
															<div className='bg-[#F9FAFB] border border-[#F9FAFB] py-2 pl-4 flex items-center space-x-4 w-full'>
																<p className='text-[#374151] text-sm'>
																	Change Quote Time
																</p>
																<div className='flex items-center space-x-2 text-xs w-fit'>
																	<DatePickerWithRange />
																</div>
															</div>
														</div>
													)}
													<div className='min-h-10 w-full'>
														<input
															type='text'
															placeholder='Edit Section Label'
															onChange={(e) => handleSectionLabel(e, idx)}
															value={item.section_name}
															className='px-4 outline-none placeholder:text-xs my-1'
														/>
													</div>

													<table className='w-full text-sm text-left rtl:text-right text-[#6B7280]'>
														<thead className='text-xs bg-[#F9FAFB]'>
															<tr>
																<th
																	scope='col'
																	className='px-4 py-4 font-normal text-[#6B7280]'>
																	Basis
																</th>
																<th
																	scope='col'
																	className='font-normal text-[#6B7280]'>
																	<p className='px-6 border-l border-[#E6E7ECB2]'>
																		Unit of measure
																	</p>
																</th>
																<th
																	scope='col'
																	className='font-normal text-[#6B7280]'>
																	<p className='px-6 border-l border-[#E6E7ECB2]'>
																		Unit
																	</p>
																</th>
																<th
																	scope='col'
																	className='font-normal text-[#6B7280]'>
																	<p className='px-6 border-l border-[#E6E7ECB2] flex items-center justify-between space-x-4'>
																		Rate
																		<span className='text-[#374151] text-[10px] py-1 px-2 bg-[#E5E7EB] rounded'>
																			USD
																		</span>
																	</p>
																</th>
																<th
																	scope='col'
																	className='font-normal text-[#6B7280]'>
																	<p className='px-6 border-l border-[#E6E7ECB2] flex items-center justify-between space-x-4'>
																		Amount
																		<span className='text-[#374151] text-[10px] py-1 px-2 bg-[#E5E7EB] rounded'>
																			USD
																		</span>
																	</p>
																</th>
																<th
																	scope='col'
																	className='px-4 py-4 font-normal text-[#6B7280]'>
																	<span className='sr-only'>Actions</span>
																</th>
															</tr>
														</thead>

														<tbody className=''>
															{item.section_data.length > 0 &&
																item.section_data.map(
																	(item: any, idx: number) => (
																		<tr
																			className='bg-white border-b border-[#E6E7ECB2] text-xs'
																			key={idx}>
																			<th
																				scope='row'
																				className='font-normal text-[#6B7280] whitespace-nowrap dark:text-white'>
																				<input
																					type='text'
																					name='basis'
																					onChange={handleQuoteInput}
																					value={item.basis}
																					disabled
																					placeholder='Enter Basis'
																					className='px-4 py-4 border-none outline-none'
																				/>
																			</th>

																			<td className=''>
																				<Select
																					value={item.unit_of_measurement}
																					onValueChange={handleQuoteInput}>
																					<SelectTrigger>
																						<SelectValue
																							placeholder='Select a unit'
																							className='w-max border: 0px;'
																						/>
																					</SelectTrigger>
																					<SelectContent className='w-max border-0'>
																						<SelectGroup>
																							<SelectItem value='kilogram'>
																								per kilogram
																							</SelectItem>
																							<SelectItem value='gram'>
																								per gram
																							</SelectItem>
																							<SelectItem value='tonne'>
																								per tonne
																							</SelectItem>
																						</SelectGroup>
																					</SelectContent>
																				</Select>
																			</td>

																			<td className=''>
																				<input
																					type='number'
																					name='unit'
																					onChange={handleQuoteInput}
																					value={item.unit}
																					disabled
																					placeholder='Enter Unit'
																					className='px-4 outline-none border-l border-[#E6E7ECB2]'
																				/>
																			</td>

																			<td className=''>
																				<input
																					type='number'
																					name='rate'
																					onChange={handleQuoteInput}
																					value={item.rate}
																					disabled
																					placeholder='Enter rate'
																					className='px-4 outline-none border-l border-[#E6E7ECB2]'
																				/>
																			</td>

																			<td className=''>
																				<input
																					type='text'
																					name='amount'
																					onChange={handleQuoteInput}
																					value={item.amount}
																					disabled
																					placeholder='Amount'
																					className='px-4 outline-none border-l border-[#E6E7ECB2]'
																				/>
																			</td>

																			<td className='px-4 py-4 text-right'>
																				<FiTrash
																					size={15}
																					className='text-[red]'
																				/>
																			</td>
																		</tr>
																	)
																)}

															{item.editable && (
																<tr className='bg-white border-b border-[#E6E7ECB2] text-xs'>
																	<th
																		scope='row'
																		className='font-normal text-[#6B7280] whitespace-nowrap dark:text-white'>
																		<input
																			type='text'
																			name='basis'
																			onChange={handleQuoteInput}
																			value={quoteInput.basis}
																			placeholder='Enter Basis'
																			className='px-4 py-4 border-none outline-none'
																		/>
																	</th>

																	<td className=''>
																		<SelectInput />
																	</td>

																	<td className=''>
																		<input
																			type='number'
																			name='unit'
																			onChange={handleQuoteInput}
																			value={quoteInput.unit}
																			placeholder='Enter Unit'
																			className='px-4 outline-none border-l border-[#E6E7ECB2]'
																		/>
																	</td>

																	<td className=''>
																		<input
																			type='number'
																			name='rate'
																			onChange={handleQuoteInput}
																			value={quoteInput.rate}
																			placeholder='Enter rate'
																			className='px-4 outline-none border-l border-[#E6E7ECB2]'
																		/>
																	</td>

																	<td className=''>
																		<input
																			type='text'
																			name='amount'
																			onChange={handleQuoteInput}
																			value={quoteInput.amount}
																			placeholder='Amount'
																			className='px-4 outline-none border-l border-[#E6E7ECB2]'
																		/>
																	</td>

																	<td className='px-4 py-4 text-right'>
																		<FiTrash size={15} className='text-[red]' />
																	</td>
																</tr>
															)}
														</tbody>
													</table>

													<div className=''>
														<button
															className='text-[#00861E] px-4 py-4 text-sm flex items-center gap-2'
															onClick={() => handleAddQuote(idx)}>
															<MdAddBox />
															Add new basis
														</button>
													</div>
												</div>

												{idx === sectionList.length - 1 && (
													<div className='flex flex-col '>
														<div className='mt-8 w-full'>
															<button
																className='text-[#00861E] font-normal text-sm bg-[#37B2481A] w-full p-4 flex gap-x-2 items-center justify-center'
																onClick={handleAddSection}>
																<MdAddBox size={20} />
																Add new Section
															</button>
														</div>
														<div className='mt-8 w-full flex justify-between'>
															<Button
																variant='outline'
																className='text-[red] font-normal text-sm border px-8'
																onClick={() => window.history.back()}>
																Cancel
															</Button>
															<Button
																variant='outline'
																color='green'
																type='submit'
																className='font-normal text-sm p-4 flex gap-x-2 items-center justify-center'
																onClick={() => handleCreate()}>
																Save quote
															</Button>
														</div>
													</div>
												)}
											</div>

											<div className='w-[21rem] h-fit border rounded-xl border-[#E5E7EB] p-5'>
												<div className='flex text-sm justify-between items-center text-[#1F2937]'>
													<p className='font-medium'>Section Currency</p>
													<p className='flex gap-x-2'>
														USD{' '}
														<Image src={usFlag} alt='' width={20} height={20} />
													</p>
												</div>
												<div className='border-[#E5E7EB] border-t mt-6 py-6'>
													<p className='font-normal text-sm text-[#6B7280]'>
														Currency & Rate
													</p>
													<div className='flex items-center space-x-3 text-sm text-[#34373F] mt-2'>
														<div className='p-2 px-3 border'>
															<Image
																src={usFlag}
																alt=''
																width={20}
																height={20}
															/>
														</div>
														<div className=''>
															<CgArrowsExchange size={20} />
														</div>
														<div className='flex items-center space-x-2 p-2 border grow'>
															<p>NGN</p>
															<p>N1,119.53</p>
														</div>
													</div>
												</div>
												<button className='text-[#1F2937] bg-[#F3F4F6] text-center text-sm w-full py-2.5'>
													Edit section currency
												</button>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GenerateQuote;
