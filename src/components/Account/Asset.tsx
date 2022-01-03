import MultiSourceContentDisplay from 'components/MultiSourceContentDisplay';
import { SupportedChainId } from 'constants/chains';
import React from 'react';

export const ChainLogo: { [K in SupportedChainId]: `${string}.${'svg' | 'png' | 'webp'}` } = {
	[SupportedChainId.MAINNET]: 'mainnet.webp',
	[SupportedChainId.POLYGON]: 'polygon-light.svg',
	[SupportedChainId.FANTOM]: 'fantom.svg',
	[SupportedChainId.OPTIMISM]: 'optimism.svg',
	[SupportedChainId.ARBITRUM]: 'arbitrum.svg',
	[SupportedChainId.AVALANCHE]: 'avalanche.svg'
};

export const ChainIndicator: { [K in SupportedChainId]: `border-chain-${string}` } = {
	[SupportedChainId.MAINNET]: 'border-chain-ethereum',
	[SupportedChainId.POLYGON]: 'border-chain-polygon',
	[SupportedChainId.FANTOM]: 'border-chain-fantom',
	[SupportedChainId.OPTIMISM]: 'border-chain-optimism',
	[SupportedChainId.ARBITRUM]: 'border-chain-arbitrum',
	[SupportedChainId.AVALANCHE]: 'border-chain-avalanche'
};

export interface AssetProps {
	chain: SupportedChainId;
	collection: string;
	name?: string;
	image?: string;
}

const Asset: React.FC<AssetProps> = ({ chain, collection, name, image }) => {
	const indicator = ChainIndicator[chain];
	const logo = ChainLogo[chain];

	return (
		<>
			<div className="max-w-[16.4rem] min-w-[16.4rem]">
				<div className={`relative rounded-lg bg-gray-600 z-10 border-4 h-full ${indicator}`}>
					<div className="min-h-[16rem] min-w-[16rem] relative">
						{image && (
							<MultiSourceContentDisplay
								src={image}
								className="rounded-lg absolute left-0 right-0 top-0 bottom-0 m-auto max-h-64 max-w-[16rem]"
							/>
						)}
					</div>
					<div className="px-6 py-2">
						<div className="absolute z-10 right-1 bottom-1">
							<img className="max-h-6 max-w-6" src={logo ? `/assets/chains/${logo}` : undefined} />
						</div>
						<div className="text-sm text-gray-400 truncate">{collection}</div>
						{name && <div className="font-semibold truncate">{name}</div>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Asset;
