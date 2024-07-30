import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import quotesReducer from './features/features';
import createSagaMiddleware from 'redux-saga';
import { watchFetchQuotes } from './saga';

const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
	const store = configureStore({
		reducer: {
			quotes: quotesReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(sagaMiddleware),
	});
	sagaMiddleware.run(watchFetchQuotes);
	return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
