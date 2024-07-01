import GenerateQuote from '@/components/GenerateQuote';
import React from 'react';
import StoreProvider from '../StoreProvider';

type Props = {};

const Index = (props: Props) => {
	return (
		<StoreProvider>
			<header className='min-h-4 shadow bg-[#FAFAFA] py-8 sticky z-20 top-0 left-0 w-full'>
				<div className='flex items-center justify-between max-w-[83rem] mx-auto'>
					<div className=''>
						<button className='text-xs text-[#6B7280]'>Back to quotes</button>
						<h2 className='text-[#1F2937] text-2xl'>
							“Quote Title Here”{' '}
							<span className='text-[#6B7280]'>[2/5/2024]</span>
						</h2>
					</div>
					<div className='flex items-center space-x-4'>
						<button className='py-2 px-4 text-[#6B7280] rounded shadow-sm border border-[#F3F4F6] bg-white'>
							Save as draft
						</button>
						<button className='text-[#005C00] bg-[#37B24833] py-2 px-4 rounded shadow-sm'>
							Preview
						</button>
					</div>
				</div>
			</header>
			<GenerateQuote />
		</StoreProvider>
	);
};

export default Index;
