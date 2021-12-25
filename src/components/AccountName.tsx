import React from 'react';
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'state/reducers/user';
import { EtherscanType, formatEtherscanLink, shortenHex } from 'utils/utils';
import useENSName from '../hooks/useENSName';

const AccountName: React.FC = () => {
	const account = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	const ENSName = useENSName(account);

	if (!account) return null;

	return (
		<>
			<a href={formatEtherscanLink(EtherscanType.Account, [chainId, account])} target="_blank" rel="noopener noreferrer">
				{ENSName || `${shortenHex(account, 4)}`}
			</a>
		</>
	);
};

export default AccountName;
