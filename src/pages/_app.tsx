import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'state';
import '../styles/_App.css';

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
	return new Web3Provider(provider);
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Provider store={store}>
				<Web3ReactProvider getLibrary={getLibrary}>
					<Component {...pageProps} />
				</Web3ReactProvider>
			</Provider>
		</>
	);
};

export default App;
