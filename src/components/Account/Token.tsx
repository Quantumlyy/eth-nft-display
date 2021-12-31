import MultiSourceImage from 'components/MultiSourceImage';
import React from 'react';

export enum ChainIndicator {
	Mainnet = 'border-chain-ethereum',
	Polygon = 'border-chain-polygon',
	Optimism = 'border-chain-optimism'
}

export interface TokenProps {
	collection: string;
	indicator?: ChainIndicator;
	image?: string;
}

const Token: React.FC<TokenProps> = ({ collection, image, indicator }) => {
	indicator ??= ChainIndicator.Mainnet;

	return (
		<>
			<div className={`rounded-lg bg-gray-600 border-2 h-full ${indicator}`}>
				<div className="min-h-[16rem] min-w-[16rem] relative">
					{image && (
						<MultiSourceImage src={image} className="rounded-lg absolute left-0 right-0 top-0 bottom-0 m-auto max-h-64 max-w-[16rem]" />
					)}
				</div>
				<div className="px-6 py-2">
					<div className="text-sm">{collection}</div>
				</div>
			</div>
		</>
	);
};

export default Token;
