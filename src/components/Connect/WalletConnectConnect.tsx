import { UserRejectedRequestError } from '@web3-react/walletconnect-connector';
import { walletConnect } from 'connectors';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';

const WalletConnectConnect: React.FC = () => {
	const { error, activate, setError } = useActiveWeb3React();

	if (error) {
		return null;
	}

	return (
		<>
			<div className="m-4">
				<button
					className="dark:text-gray-50 border dark:border-gray-600 dark:border-opacity-40 dark:bg-gray-800 transition-colors duration-300 ease-in-out dark:hover:bg-pink-900 dark:hover:border-pink-800 p-2 m-auto rounded-lg w-full"
					onClick={() => {
						activate(walletConnect, undefined, true).catch((error) => {
							// ignore the error if it's a user rejected request
							if (!(error instanceof UserRejectedRequestError)) {
								setError(error);
							}
						});
					}}
				>
					WalletConnect
				</button>
			</div>
		</>
	);
};

export default WalletConnectConnect;
