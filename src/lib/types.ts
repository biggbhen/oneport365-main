export interface QuoteTypes {
	quote_title: string;
	quote_date: string;
	sections: {
		section_name: string;
		section_number: number;
		section_currency: {
			currency: string;
			exchange_rate: number;
			is_base_currency: boolean;
			customer_currency: string;
		};
		section_data: {
			basis: string;
			unit_of_measurement: string;
			unit: number;
			rate: number;
			amount: number;
		}[];
	}[];
}
