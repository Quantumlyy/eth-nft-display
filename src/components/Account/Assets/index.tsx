import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useENSDomain from 'hooks/useENSDomain';
import React from 'react';
import MainnetEIP1155Assets from './MainnetEIP1155Assets';
import MainnetEIP721Assets from './MainnetEIP721Assets';
import MainnetNonStandardNFTAssets from './MainnetNonStandardNFTAssets';
import OptimismEIP1155Assets from './OptimismEIP1155Assets';
import OptimismEIP721Assets from './OptimismEIP721Assets';

export interface AssetsProps {
	address?: string;
}

const Assets: React.FC<AssetsProps> = ({ address }) => {
	const resolvedAddress = useENSDomain(address);
	const { account } = useActiveWeb3React();
	const sortedAddress = (resolvedAddress || address || account || '').toLowerCase();

	return (
		<div className="container">
			<div className="flex flex-wrap gap-8">
				<MainnetEIP721Assets address={sortedAddress} />
				<MainnetEIP1155Assets address={sortedAddress} />
				<MainnetNonStandardNFTAssets address={sortedAddress} />
				<OptimismEIP721Assets address={sortedAddress} />
				<OptimismEIP1155Assets address={sortedAddress} />
			</div>
		</div>
	);
};

export default Assets;
