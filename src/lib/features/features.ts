interface QuotesState {
	quotes: any[];
	loading: boolean;
	error: string | null;
}

const initialState: QuotesState = {
	quotes: [],
	loading: false,
	error: null,
};

// actionTypes.ts
export const FETCH_QUOTES_REQUESTED = 'FETCH_QUOTES_REQUESTED';
export const FETCH_QUOTES_SUCCEEDED = 'FETCH_QUOTES_SUCCEEDED';
export const FETCH_QUOTES_FAILED = 'FETCH_QUOTES_FAILED';

export const fetchQuotesRequested = (startDate: string, endDate: string) => ({
	type: FETCH_QUOTES_REQUESTED,
	payload: { startDate, endDate },
});
export const fetchQuotesSucceeded = (quotes: any[]) => ({
	type: FETCH_QUOTES_SUCCEEDED,
	payload: quotes,
});
export const fetchQuotesFailed = (error: string) => ({
	type: FETCH_QUOTES_FAILED,
	payload: error,
});

const quotesReducer = (state = initialState, action: any): QuotesState => {
	switch (action.type) {
		case FETCH_QUOTES_REQUESTED:
			return { ...state, loading: true, error: null };
		case FETCH_QUOTES_SUCCEEDED:
			return { ...state, loading: false, quotes: action.payload.data };
		case FETCH_QUOTES_FAILED:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export default quotesReducer;
