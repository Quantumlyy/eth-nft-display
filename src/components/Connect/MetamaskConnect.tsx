import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { ActiveStatus } from 'utils/logs';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import { useSelector } from 'react-redux';
import { selectEagerAttempt } from 'state/reducers/user';
import { metamask } from 'connectors';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import Image from 'next/image';

const MetamaskConnect: React.FC = () => {
	const { active, error, activate, setError } = useActiveWeb3React();
	// initialize metamask onboarding
	const onboarding = useRef<MetaMaskOnboarding>();
	// manage connecting state for injected connector
	const [_, setConnecting] = useState(false);
	const triedToEagerConnect = useSelector(selectEagerAttempt);

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

	return (
		<>
			<button
				className="w-full text-white p-2 m-4 bg-gray-400 border-4 border-gray-600 rounded-lg"
				onClick={() => {
					if (!MetaMaskOnboarding.isMetaMaskInstalled()) return onboarding.current?.startOnboarding();
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
				<div className="flex">
					<span>{MetaMaskOnboarding.isMetaMaskInstalled() ? 'Metamask' : 'Install Metamask'}</span>
					<div>
						<Image src="/assets/wallets/metamask.png" height={32} width={32} loading="lazy" />
					</div>
				</div>
			</button>
		</>
	);
};

export default MetamaskConnect;
