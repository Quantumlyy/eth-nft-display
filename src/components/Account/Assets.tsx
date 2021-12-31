import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useENSDomain from 'hooks/useENSDomain';
import React from 'react';
import EthEIP721Assets from './Assets/EthEIP721Assets';

export interface AssetsProps {
	address?: string;
}

const Assets: React.FC<AssetsProps> = ({ address }) => {
	const resolvedAddress = useENSDomain(address);
	const { account } = useActiveWeb3React();
	const sortedAddress = (resolvedAddress || address || account || '').toLowerCase();

	return (
		<>
			<div>
				<EthEIP721Assets address={sortedAddress} />
			</div>
		</>
	);
};

export default Assets;
