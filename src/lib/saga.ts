// sagas.ts
import { takeEvery, call, put } from 'redux-saga/effects';
import {
	FETCH_QUOTES_REQUESTED,
	FETCH_QUOTES_SUCCEEDED,
	FETCH_QUOTES_FAILED,
	fetchQuotesSucceeded,
	fetchQuotesFailed,
} from './features/features';

interface FetchQuotesAction {
	type: typeof FETCH_QUOTES_REQUESTED;
	payload: { startDate: string; endDate: string };
}

function* fetchQuotes(action: FetchQuotesAction) {
	const { startDate, endDate } = action.payload;
	const api = `https://test-api.oneport365.com/api/admin/quotes/assessment/get?start_date=${startDate}&end_date=${endDate}`;
	try {
		const response: Response = yield call(fetch, api);
		const quotes: any[] = yield call([response, 'json']);
		// console.log(quotes);
		yield put(fetchQuotesSucceeded(quotes));
	} catch (e: any) {
		yield put(fetchQuotesFailed(e.message));
	}
}

export function* watchFetchQuotes() {
	yield takeEvery(FETCH_QUOTES_REQUESTED, fetchQuotes);
}
