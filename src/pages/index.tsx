import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useEagerConnect from 'hooks/useEagerConnect';
import React from 'react';
import dynamic from 'next/dynamic';
import Offset from 'components/Navbar/Offset';

const Account = dynamic(() => import('components/Account'), { ssr: false });

export default function Home() {
	const { account, library } = useWeb3React<Web3Provider>();
	const triedToEagerConnect = useEagerConnect();

	const isConnected = typeof account === 'string' && Boolean(library);

	return (
		<div>
			<Offset />
			<Account triedToEagerConnect={triedToEagerConnect} />

			{isConnected ? <h1>Hello</h1> : null}
		</div>
	);
}
