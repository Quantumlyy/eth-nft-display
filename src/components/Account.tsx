import type { Web3Provider } from '@ethersproject/providers';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { injected } from 'connectors';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface AccountProps {
	triedToEagerConnect: boolean;
}

const Account: React.FC<AccountProps> = ({ triedToEagerConnect }) => {
	const { active, error, activate, chainId, account, setError } = useWeb3React<Web3Provider>();
	// initialize metamask onboarding
	const onboarding = useRef<MetaMaskOnboarding>();
	const [connecting, setConnecting] = useState(false);

	useLayoutEffect(() => {
		onboarding.current = new MetaMaskOnboarding();
	}, []);
	useEffect(() => {
		if (active || error) {
			setConnecting(false);
			onboarding.current?.stopOnboarding();
		}
	}, [active, error]);

	return (
		<>
		</>
	);
};

export default Account;
