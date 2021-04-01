import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'state';
import '../styles/_App.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	);
};

export default App;
