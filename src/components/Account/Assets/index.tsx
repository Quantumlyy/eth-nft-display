import { Subgraph } from 'client/graphprotocol/subgraphs';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useENSDomain from 'hooks/useENSDomain';
import React from 'react';
import ArbitrumEIP1155Assets from './ArbitrumEIP1155Assets';
import BobaEIP1155Assets from './BobaEIP1155Assets';
import ChainEIP721Assets from './ChainEIP721Assets';
import MainnetEIP1155Assets from './MainnetEIP1155Assets';
import MainnetEIP721Assets from './MainnetEIP721Assets';
import MainnetNonStandardNFTAssets from './MainnetNonStandardNFTAssets';
import OptimismEIP1155Assets from './OptimismEIP1155Assets';
import PolygonEIP1155Assets from './PolygonEIP1155Assets';

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
				<ChainEIP721Assets address={sortedAddress} chainId={SupportedChainId.POLYGON} subgraph={Subgraph.POLYGON_EIP721} />
				<PolygonEIP1155Assets address={sortedAddress} />
				<ChainEIP721Assets address={sortedAddress} chainId={SupportedChainId.OPTIMISM} subgraph={Subgraph.OPTIMISM_EIP721} />
				<OptimismEIP1155Assets address={sortedAddress} />
				<ChainEIP721Assets address={sortedAddress} chainId={SupportedChainId.ARBITRUM} subgraph={Subgraph.ARBITRUM_EIP721} />
				<ArbitrumEIP1155Assets address={sortedAddress} />
				<ChainEIP721Assets address={sortedAddress} chainId={SupportedChainId.BOBA} subgraph={Subgraph.BOBA_EIP721} />
				<BobaEIP1155Assets address={sortedAddress} />
			</div>
		</div>
	);
};

export default Assets;
