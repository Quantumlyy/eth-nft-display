import type { Web3Provider } from '@ethersproject/providers';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetUser, setAddress } from 'state/reducers/user';
import { injected } from '../connectors';
import AccountName from './AccountName';

export interface AccountProps {
	triedToEagerConnect: boolean;
}

const Account: React.FC<AccountProps> = ({ triedToEagerConnect }) => {
	const { active, error, activate, account, setError } = useWeb3React<Web3Provider>();
	// initialize metamask onboarding
	const onboarding = useRef<MetaMaskOnboarding>();
	// manage connecting state for injected connector
	const [_, setConnecting] = useState(false);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		onboarding.current = new MetaMaskOnboarding();
	}, []);
	useEffect(() => {
		if (active || error) {
			setConnecting(false);
			onboarding.current?.stopOnboarding();
		}
		console.log(active);
	}, [active, error]);
	useEffect(() => {
		if (typeof account === 'string') dispatch(setAddress(account));
		else dispatch(resetUser());
	}, [account, dispatch]);

	if (error || !triedToEagerConnect) {
		return null;
	}

	if (typeof account === 'string') {
		return <AccountName />;
	}

	const hasMetaMaskOrWeb3Available = MetaMaskOnboarding.isMetaMaskInstalled() || (window as any)?.ethereum || (window as any)?.web3;

	return (
		<div>
			{hasMetaMaskOrWeb3Available ? (
				<button
					onClick={() => {
						setConnecting(true);

						activate(injected, undefined, true).catch((error) => {
							// ignore the error if it's a user rejected request
							if (error instanceof UserRejectedRequestError) {
								setConnecting(false);
							} else {
								setError(error);
							}
						});
					}}
				>
					{MetaMaskOnboarding.isMetaMaskInstalled() ? 'Connect to MetaMask' : 'Connect to Wallet'}
				</button>
			) : (
				<button onClick={() => onboarding.current?.startOnboarding()}>Install Metamask</button>
			)}
		</div>
	);
};

export default Account;
