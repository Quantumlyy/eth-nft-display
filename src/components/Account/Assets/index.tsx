import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useENSDomain from 'hooks/useENSDomain';
import React from 'react';
import ArbitrumEIP1155Assets from './ArbitrumEIP1155Assets';
import ArbitrumEIP721Assets from './ArbitrumEIP721Assets';
import BobaEIP1155Assets from './BobaEIP1155Assets';
import BobaEIP721Assets from './BobaEIP721Assets';
import MainnetEIP1155Assets from './MainnetEIP1155Assets';
import MainnetEIP721Assets from './MainnetEIP721Assets';
import MainnetNonStandardNFTAssets from './MainnetNonStandardNFTAssets';
import OptimismEIP1155Assets from './OptimismEIP1155Assets';
import OptimismEIP721Assets from './OptimismEIP721Assets';
import PolygonEIP1155Assets from './PolygonEIP1155Assets';
import PolygonEIP721Assets from './PolygonEIP721Assets';

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
				<PolygonEIP721Assets address={sortedAddress} />
				<PolygonEIP1155Assets address={sortedAddress} />
				<OptimismEIP721Assets address={sortedAddress} />
				<OptimismEIP1155Assets address={sortedAddress} />
				<ArbitrumEIP721Assets address={sortedAddress} />
				<ArbitrumEIP1155Assets address={sortedAddress} />
				<BobaEIP721Assets address={sortedAddress} />
				<BobaEIP1155Assets address={sortedAddress} />
			</div>
		</div>
	);
};

export default Assets;
