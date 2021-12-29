import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import Offset from 'components/Navbar/Offset';

export default function Home() {
	const { account, library } = useWeb3React<Web3Provider>();

	const isConnected = typeof account === 'string' && Boolean(library);

	return (
		<div>
			<Offset />
			Yeet
			{isConnected ? <h1>Hello</h1> : null}
		</div>
	);
}
