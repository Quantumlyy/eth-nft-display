import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import Connect from 'components/Connect/Connect';
import Navbar from 'components/Navbar/Navbar';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'state';
import 'styles/_App.css';

import { config, dom } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
config.autoAddCss = false;

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
	return new Web3Provider(provider);
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Provider store={store}>
				<Web3ReactProvider getLibrary={getLibrary}>
					<Head>
						{/* This fixes big icons with next-seo since CSS is somehow overwritten*/}
						<style>{dom.css()}</style>
					</Head>
					<>
						<Connect />
						<header>
							<Navbar />
						</header>
						<main>
							<Component {...pageProps} />
						</main>
					</>
				</Web3ReactProvider>
			</Provider>
		</>
	);
};

export default App;
