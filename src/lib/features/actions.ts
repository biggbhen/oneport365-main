import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window !== 'undefined') {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		}
		return initialValue;
	});

	useEffect(() => {
		const handleStorageChange = () => {
			const item = localStorage.getItem(key);
			setStoredValue(item ? JSON.parse(item) : initialValue);
		};

		window.addEventListener('storage', handleStorageChange);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [key, initialValue]);

	const setValue = (value: any) => {
		setStoredValue(value);
		localStorage.setItem(key, JSON.stringify(value));
	};

	return [storedValue, setValue];
};
