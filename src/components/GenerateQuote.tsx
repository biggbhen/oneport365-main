import React from 'react';
import { DatePickerWithRange } from './datePicker/DateRange';
import { SelectInput } from './Select';

type Props = {};

const GenerateQuote = (props: Props) => {
	return (
		<div className='max-w-[83rem] mx-auto py-10'>
			<div className='flex justify-between space-x-8'>
				<div className='grow'>
					<div className='flex space-x-8'>
						<div className='relative overflow-x-auto shadow-sm w-full h-fit border border-[#F3F4F6]'>
							<div className='bg-[#F9FAFB] border border-[#F9FAFB] py-2 px-4 flex items-center space-x-4 w-full'>
								<p className='text-[#374151] text-sm'>Change Quote Time</p>
								<div className='flex items-center space-x-2 text-xs w-fit'>
									<DatePickerWithRange />
								</div>
							</div>
							<div className='border-2 border-transparent h-10 w-full'></div>

							<table className='w-full text-sm text-left rtl:text-right text-[#6B7280]'>
								<thead className='text-xs bg-[#F9FAFB]'>
									<tr>
										<th
											scope='col'
											className='px-4 py-4 font-normal text-[#6B7280]'>
											Basis
										</th>
										<th scope='col' className='font-normal text-[#6B7280]'>
											<p className='px-6 border-l border-[#E6E7ECB2]'>
												Unit of measure
											</p>
										</th>
										<th scope='col' className='font-normal text-[#6B7280]'>
											<p className='px-6 border-l border-[#E6E7ECB2]'>Unit</p>
										</th>
										<th scope='col' className='font-normal text-[#6B7280]'>
											<p className='px-6 border-l border-[#E6E7ECB2] flex items-center justify-between space-x-4'>
												Rate
												<span className='text-[#374151] text-[10px] py-1 px-2 bg-[#E5E7EB] rounded'>
													USD
												</span>
											</p>
										</th>
										<th scope='col' className='font-normal text-[#6B7280]'>
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
											<span className='sr-only'>Edit</span>
										</th>
									</tr>
								</thead>

								<tbody className=''>
									<tr className='bg-white border-b border-[#E6E7ECB2] text-xs'>
										<th
											scope='row'
											className='font-normal text-[#6B7280] whitespace-nowrap dark:text-white'>
											<input
												type='text'
												placeholder='Enter Basis'
												className='px-4 py-4 border-none outline-none'
											/>
										</th>

										<td className=''>
											<SelectInput />
										</td>

										<td className=''>
											<input
												type='text'
												placeholder='Enter Unit'
												className='px-4 outline-none border-l border-[#E6E7ECB2]'
											/>
										</td>

										<td className=''>
											<input
												type='text'
												placeholder='Enter rate'
												className='px-4 outline-none border-l border-[#E6E7ECB2]'
											/>
										</td>

										<td className=''>
											<input
												type='text'
												placeholder='Amount'
												className='px-4 outline-none border-l border-[#E6E7ECB2]'
											/>
										</td>

										<td className='px-4 py-4 text-right'>
											<a
												href='#'
												className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
												Edit
											</a>
										</td>
									</tr>
								</tbody>
							</table>
							<div className=''>
								<button className='text-[#00861E] px-4 py-4 text-sm'>
									Add new basis
								</button>
							</div>
						</div>

						<div className='w-[21rem] h-fit border rounded-xl border-[#E5E7EB] p-5'>
							<div className='flex text-sm justify-between items-center text-[#1F2937]'>
								<p className='font-medium'>Section Currency</p>

								<p>USD</p>
							</div>
							<div className='border-[#E5E7EB] border-t mt-6 py-6'>
								<p className='font-normal text-sm text-[#6B7280]'>
									Currency & Rate
								</p>
								<div className='flex items-center space-x-3 text-sm text-[#34373F] mt-2'>
									<div className='p-2 px-3 border'>USA</div>
									<div className=''>=</div>
									<div className='flex items-center space-x-2 p-2 border grow'>
										<p>NGN</p>
										<p>N1,119.53</p>
									</div>
								</div>
							</div>
							<button className='text-[#1F2937] bg-[#F3F4F6] text-center text-sm w-full py-2.5 px-3.5'>
								Edit section currency
							</button>
						</div>
					</div>

					<div className='flex space-x-8'>
						<div className='mt-8 w-full'>
							<button className='text-[#00861E] font-normal text-sm bg-[#37B2481A] w-full py-3 px-4'>
								Add new Section
							</button>
						</div>

						<div className='w-[21rem]'></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GenerateQuote;
