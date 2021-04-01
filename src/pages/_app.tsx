import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
};

export default App;
