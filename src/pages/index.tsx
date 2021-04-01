import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useEagerConnect from 'hooks/useEagerConnect';
import usePersonalSign from 'hooks/usePersonalSign';
import React from 'react';

export default function Home() {
	const { account, library } = useWeb3React<Web3Provider>();
	const triedToEagerConnect = useEagerConnect();

	return <div></div>;
}
