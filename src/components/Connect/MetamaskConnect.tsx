import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import { useSelector } from 'react-redux';
import { selectEagerAttempt } from 'state/reducers/user';
import { metamask } from 'connectors';
import { UserRejectedRequestError } from '@web3-react/injected-connector';

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
	}, [active, error]);

	if (error || !triedToEagerConnect) {
		return null;
	}

	return (
		<>
			<div className="m-4">
				<button
					className="dark:text-gray-50 border dark:border-gray-600 dark:border-opacity-40 dark:bg-gray-800 transition-colors duration-300 ease-in-out dark:hover:bg-pink-900 dark:hover:border-pink-800 p-2 m-auto rounded-lg w-full"
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
					</div>
				</button>
			</div>
		</>
	);
};

export default MetamaskConnect;
