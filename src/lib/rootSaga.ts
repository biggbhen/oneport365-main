import { all } from 'redux-saga/effects';
import { watchCreateQuote, watchFetchQuotes } from './saga';

export default function* rootSaga() {
	yield all([watchFetchQuotes(), watchCreateQuote()]);
}
