'use client';

import { HTMLAttributes, useMemo } from 'react';
import { CustomModal } from '../QuoteDetail';
import { DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import {
	DestinationHandlingChargesTable,
	OrignHandlingChargesTable,
} from './handlingChargesTable';

const QuoteDetailModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const data = useMemo(() => {
		// transform data

		const details = [
			{ title: 'Attention (Customer Name)', value: 'Daniel Alobode' },
			{ title: 'Email Address', value: 'ample@gmail.com' },
			{ title: 'Commodity', value: 'Electric goods' },
			{ title: 'Service Type', value: 'Export Air Frieght' },
			{ title: 'Chargeable weight (KG)', value: '55.34KG' },
			{ title: 'POL (Port of lading)', value: 'Lagos City' },
			{ title: 'POD (Port of Destination)', value: 'Johannesburg' },
			{ title: 'Due Date', value: '23rd, July 2024' },
		];

		const terms = [
			'Above rates are for cargo details as provided by you',
			'Above quote is/are subject to VAT.',
			'Above quoted rates are on Door-to-Door basis excludes of Duties at the time of exports.',
			'Standard Trading Terms and Conditions of Oneport365 applies.',
			'Above rates excludes services like packing, re-packing, Customs Inspection etc which may be charged additional(if required) with prior customer approval.',
			'Above rates do not cover Insurance charges.',
			'Above rates does not include any additional services required e.g.- special handling, week-end pickup/delivery which has not been agreed and same will be charged as mutually agreed before services are rendered.',
			'Above rates apply for weight/volume (whichever is higher). Rates are based on ratio 1: 6.',
			'Quoted rates are valid for a period of one month and will need prior approval from Oneport365 incase further extension is required.',
			'Charges are based on shipment details provided by you: if quantity/weight will vary our quotation will change accordingly.',
			'Pricing team has the right to re-price if the actual cargo details differ from the information indicated in enquiry.',
			'Unless otherwise specified, any haulage included within the quote is based upon standard roadside only and between business hours Monday to Friday.',
		];

		return {
			details,
			terms,
		};
	}, []);
	return (
		<div>
			QuoteDetailModal
			<CustomModal isOpen={isOpen} onClose={onClose}>
				<>
					<DialogHeader className=' px-9 py-4 bg-[#fbfbfb] flex flex-row justify-between gap-8 items-center border border-gray-200'>
						<DialogTitle>
							Quote Detail{' '}
							<span className='text-slate-500 ml-2 font-medium'>{`#34920_fe2`}</span>
						</DialogTitle>

						<div className='flex gap-3 items-center justify-end pr-7'>
							<Button className='bg-[#296fd8]'>Save Quote</Button>
							<Button
								variant={'outline'}
								className='border-[#296fd8] text-[#296fd8] text-[20px]'>
								<svg
									stroke='currentColor'
									fill='currentColor'
									strokeWidth='0'
									viewBox='0 0 24 24'
									height='1em'
									width='1em'
									xmlns='http://www.w3.org/2000/svg'>
									<path fill='none' d='M0 0h24v24H0z'></path>
									<path d='M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z'></path>
								</svg>
							</Button>
						</div>
					</DialogHeader>

					<div className='bg-white w-full py-12 px-[5%] '>
						{/* inner detail card */}
						<div className='border border-gray-200 px-5 py-7'>
							{/* header */}
							<div className='mb-6 flex justify-between items-start gap-10'>
								<h1 className='text-6xl font-bold'>LOGO</h1>

								<div className='flex flex-col gap-1 items-end'>
									<p>{`UAC Building Marina`}</p>
									<p>{`Lagos, Nigeria`}</p>
									<p>{`100223`}</p>
								</div>
							</div>

							{/* quote owner details */}
							<div className='mb-10 bg-[#f9fafb] p-5'>
								<div className='grid grid-cols-4 gap-6 border-b border-b-gray-200 pt-3 pb-7'>
									{data?.details?.map((detail, index) => (
										<QuoteLabelAndValue
											key={index}
											label={detail.title}
											value={detail.value}
											labelClass={`${
												detail.title?.toLowerCase().includes('due date')
													? 'text-red-500'
													: ' text-gray-400'
											} text-sm mb-1.5`}
											valueClass={`font-semibold ${
												detail.title?.toLowerCase().includes('email')
													? 'text-green-500'
													: 'text-slate-800'
											}`}
										/>
									))}
								</div>

								<div className='py-7 flex justify-between items-center gap-8'>
									<QuoteLabelAndValue
										label='Collection Address'
										value='INNIO Waukesha Gas Engines B123 116th Street, Suitr 300,
                      SW Side of building Dock 46-50, Pleasant Praire, WI 53158'
										wrapperClass='max-w-md'
										labelClass='text-gray-400 text-sm mb-2 '
										valueClass='font-semibold text-slate-800'
									/>

									<QuoteLabelAndValue
										label='Delivery Destination'
										value='TPG PH'
										wrapperClass='text-end'
										labelClass='text-gray-400 text-sm mb-2 '
										valueClass='font-semibold text-slate-800 text-end'
									/>
								</div>
							</div>

							{/* origin quote breakdown */}
							<div className='mb-10'>
								<QuoteLabelAndValue
									label='Quote Breakdown'
									value='ORIGIN HANDLING PAGE'
									valueClass='text-xl'
								/>

								<div className='mt-4 border-t border-t-gray-200'>
									<OrignHandlingChargesTable />
								</div>
							</div>

							{/* destination quote breakdown */}
							<div className='mb-10'>
								<QuoteLabelAndValue
									value='DESTINATION HANDLING CHARGE'
									valueClass='text-xl'
								/>

								<div className='mt-4 border-t border-t-gray-200'>
									<DestinationHandlingChargesTable />
								</div>
							</div>

							{/* notice */}
							<div className='mb-10 px-8 py-6 flex items-start gap-3 text-white bg-[#004300] rounded-2xl'>
								<div className='text-[20px] pt-1'>
									<svg
										stroke='currentColor'
										fill='currentColor'
										stroke-width='0'
										viewBox='0 0 24 24'
										height='1em'
										width='1em'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fill='none'
											strokeWidth='2'
											d='M2,3.99079514 C2,2.89130934 2.89821238,2 3.99079514,2 L20.0092049,2 C21.1086907,2 22,2.89821238 22,3.99079514 L22,20.0092049 C22,21.1086907 21.1017876,22 20.0092049,22 L3.99079514,22 C2.89130934,22 2,21.1017876 2,20.0092049 L2,3.99079514 Z M12,10 L12,18 M12,6 L12,8'></path>
									</svg>
								</div>

								<div>
									<p className='mb-5'>
										Please note this offer is firm for acceptance within
										48hours, otherwise above offer will be considered as
										invalid. Rates advised is subject to prevailing parallel
										market rate at time of invoice. Freight advised is subject
										to chargeable weight as declared by airline. Above tariff is
										not applicable to non-compliant shipments without Form Ms,
										PAARs.
									</p>

									<p>
										NOTE: duty and tax not inclusive in the rates advised. They
										will be advised when you provide the CIF value and H.S code
										We do trust that this offer meets your requirements. Please,
										contact us if any further explanation is required.
									</p>
								</div>
							</div>

							{/* terms */}
							<div className='pb-10'>
								<QuoteLabelAndValue
									value='ONEPORT365 TERMS AND CONDITIONS'
									valueClass='text-xl'
								/>

								<div className='mt-4 p-6 border border-gray-200 rounded-2xl '>
									<ol className='list-none'>
										{data.terms?.map((term, index) => (
											<li
												key={index}
												className='mb-6 flex gap-2 items-start text-sm font-semibold'>
												<span className='w-[40px] '>{index + 1}.</span>
												<span className='flex-1'>{term}</span>
											</li>
										))}
									</ol>
								</div>
							</div>
						</div>
					</div>
				</>
			</CustomModal>
		</div>
	);
};

const QuoteLabelAndValue = ({
	label,
	value,
	wrapperClass,
	labelClass,
	valueClass,
}: {
	label?: string;
	value?: string;
	// to get intellisense, extend the classnames in vscode settings > Tailwindcss class: class attribute
	wrapperClass?: HTMLAttributes<HTMLDivElement>['className'];
	labelClass?: HTMLAttributes<HTMLParagraphElement>['className'];
	valueClass?: HTMLAttributes<HTMLParagraphElement>['className'];
}) => {
	return (
		<div className={wrapperClass}>
			{label ? (
				<p className={'text-gray-400 text-sm mb-2' + labelClass || ''}>
					{label}
				</p>
			) : null}
			{value ? (
				<p className={valueClass || ''} style={{ fontWeight: 500 }}>
					{value}
				</p>
			) : null}
		</div>
	);
};

export default QuoteDetailModal;
