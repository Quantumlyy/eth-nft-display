import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useENSDomain from 'hooks/useENSDomain';
import React from 'react';
import EthEIP1155Assets from './EthEIP1155Assets';
import EthEIP721Assets from './EthEIP721Assets';

export interface AssetsProps {
	address?: string;
}

const Assets: React.FC<AssetsProps> = ({ address }) => {
	const resolvedAddress = useENSDomain(address);
	const { account } = useActiveWeb3React();
	const sortedAddress = (resolvedAddress || address || account || '').toLowerCase();

	return (
		<>
			<div className="flex flex-wrap gap-4">
				<EthEIP721Assets address={sortedAddress} />
				<EthEIP1155Assets address={sortedAddress} />
			</div>
		</>
	);
};

export default Assets;
