// sagas.ts
import { takeEvery, call, put } from 'redux-saga/effects';
import {
	FETCH_QUOTES_REQUESTED,
	FETCH_QUOTES_SUCCEEDED,
	FETCH_QUOTES_FAILED,
	CREATE_QUOTE_REQUESTED,
	CREATE_QUOTE_SUCCESS,
	CREATE_QUOTE_FAILURE,
	fetchQuotesSucceeded,
	fetchQuotesFailed,
	createQuoteSuccess,
	createQuoteFailure,
} from './features/features';

interface FetchQuotesAction {
	type: typeof FETCH_QUOTES_REQUESTED;
	payload: { startDate: string; endDate: string };
}

interface CreateQuoteAction {
	type: typeof CREATE_QUOTE_REQUESTED;
	payload: any;
}

function* fetchQuotes(action: FetchQuotesAction) {
	const { startDate, endDate } = action.payload;
	const api = `https://test-api.oneport365.com/api/admin/quotes/assessment/get?start_date=${startDate}&end_date=${endDate}`;
	try {
		const response: Response = yield call(fetch, api);
		const quotes: any[] = yield call([response, 'json']);
		yield put(fetchQuotesSucceeded(quotes));
	} catch (e: any) {
		yield put(fetchQuotesFailed(e.message));
	}
}

function* createQuote(action: CreateQuoteAction) {
	const api =
		'https://test-api.oneport365.com/api/admin/quotes/assessment/create';
	try {
		const response: Response = yield call(fetch, api, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(action.payload),
		});
		const quote: any[] = yield call([response, 'json']);
		console.log(quote);
		yield put(createQuoteSuccess(quote));
	} catch (e: any) {
		yield put(createQuoteFailure(e.message));
	}
}

export function* watchFetchQuotes() {
	yield takeEvery(FETCH_QUOTES_REQUESTED, fetchQuotes);
}

export function* watchCreateQuote() {
	yield takeEvery(CREATE_QUOTE_REQUESTED, createQuote);
}
