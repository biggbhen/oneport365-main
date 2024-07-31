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
export const CREATE_QUOTE_REQUESTED = 'CREATE_QUOTE_REQUESTED';
export const CREATE_QUOTE_SUCCESS = 'CREATE_QUOTE_SUCCESS';
export const CREATE_QUOTE_FAILURE = 'CREATE_QUOTE_FAILURE';

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
export const createQuoteRequested = (quotes: any[]) => ({
	type: CREATE_QUOTE_REQUESTED,
	payload: quotes,
});

export const createQuoteSuccess = (quotes: any[]) => ({
	type: CREATE_QUOTE_SUCCESS,
	payload: quotes,
});

export const createQuoteFailure = (error: string) => ({
	type: CREATE_QUOTE_FAILURE,
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
		case CREATE_QUOTE_REQUESTED:
			return {
				...state,
				loading: true,
				error: null,
			};
		case CREATE_QUOTE_SUCCESS:
			return {
				...state,
				loading: false,
				quotes: [...state.quotes, action.payload],
			};
		case CREATE_QUOTE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default quotesReducer;
