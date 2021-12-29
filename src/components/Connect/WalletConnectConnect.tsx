import { UserRejectedRequestError } from '@web3-react/injected-connector';
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
			<div className="text-white p-4 m-4 bg-gray-400 border-4 border-gray-600 rounded-lg">
				<button
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
