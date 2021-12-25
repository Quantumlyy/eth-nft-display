import MetaMaskOnboarding from '@metamask/onboarding';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ActiveStatus } from 'utils/logs';
import { metamask } from '../connectors';
import AccountName from './AccountName';

export interface AccountProps {
	triedToEagerConnect: boolean;
}

const Account: React.FC<AccountProps> = ({ triedToEagerConnect }) => {
	const { active, error, activate, account, setError } = useActiveWeb3React();
	// initialize metamask onboarding
	const onboarding = useRef<MetaMaskOnboarding>();
	// manage connecting state for injected connector
	const [_, setConnecting] = useState(false);

	useLayoutEffect(() => {
		onboarding.current = new MetaMaskOnboarding();
	}, []);
	useEffect(() => {
		if (active || error) {
			setConnecting(false);
			onboarding.current?.stopOnboarding();
		}
		ActiveStatus(active);
	}, [active, error]);

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

						activate(metamask, undefined, true).catch((error) => {
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
