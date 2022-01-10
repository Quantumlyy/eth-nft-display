import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import Navbar from 'components/Navbar/Navbar';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'state';
import 'styles/_App.css';

import { config, dom } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { client } from 'client';
import dynamic from 'next/dynamic';
config.autoAddCss = false;

const Connect = dynamic(() => import('components/Connect/Connect'), { ssr: false });

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
	return new Web3Provider(provider);
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<ApolloProvider client={client}>
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
							<main className="dark:bg-gray-900 dark:text-white min-h-screen">
								<Component {...pageProps} />
							</main>
						</>
					</Web3ReactProvider>
				</Provider>
			</ApolloProvider>
		</>
	);
};

export default App;
