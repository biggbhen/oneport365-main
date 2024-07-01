interface SectionData {
	basis: string;
	unit_of_measurement: string;
	unit: number;
	rate: number;
	amount: number;
}

interface SectionCurrency {
	currency: string;
	exchange_rate: number;
	is_base_currency: boolean;
	customer_currency: string;
}

interface Section {
	section_name: string;
	section_number: number;
	section_currency: SectionCurrency;
	section_data: SectionData[];
}

interface Quote {
	_id?: string;
	quote_title: string;
	quote_date: string | null;
	sections?: Section[];
}

interface SectionUpdate {
	section_name: string;
	section_number: number;
	section_currency: SectionCurrency;
	section_data: SectionData[];
	editable: boolean;
}

interface QuoteUpdate {
	quote_title: string;
	quote_date: string;
	sections: SectionUpdate[];
}
