import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { EtherscanType, formatEtherscanLink, shortenHex } from 'utils/utils';
import useENSName from '../../hooks/useENSName';

const AccountName: React.FC = () => {
	const { chainId, account } = useActiveWeb3React();

	const ENSName = useENSName(account);

	if (!account) return null;

	return (
		<>
			<a href={formatEtherscanLink(EtherscanType.Account, [chainId!, account])} target="_blank" rel="noopener noreferrer">
				{ENSName || `${shortenHex(account, 4)}`}
			</a>
		</>
	);
};

export default AccountName;
