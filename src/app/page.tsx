import Calendar from '@/components/Calendar';
import Image from 'next/image';

// Display days of the week as headers.
// Display dates in a grid format.
// Update the state when the next month button is clicked.

export default function Home() {
	return (
		<main className=''>
			<Calendar />
		</main>
	);
}
