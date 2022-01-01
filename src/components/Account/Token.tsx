import MultiSourceContentDisplay from 'components/MultiSourceContentDisplay';
import React from 'react';

export enum ChainIndicator {
	Mainnet = 'border-chain-ethereum',
	Polygon = 'border-chain-polygon',
	Optimism = 'border-chain-optimism'
}

export interface TokenProps {
	collection: string;
	name?: string;
	indicator?: ChainIndicator;
	image?: string;
}

const Token: React.FC<TokenProps> = ({ collection, name, image, indicator }) => {
	indicator ??= ChainIndicator.Mainnet;

	return (
		<>
			<div className="max-w-[16.2rem] min-w-[16.2rem]">
				<div className={`rounded-lg bg-gray-600 border-2 h-full ${indicator}`}>
					<div className="min-h-[16rem] min-w-[16rem] relative">
						{image && (
							<MultiSourceContentDisplay
								src={image}
								className="rounded-lg absolute left-0 right-0 top-0 bottom-0 m-auto max-h-64 max-w-[16rem]"
							/>
						)}
					</div>
					<div className="px-6 py-2">
						<div className="text-sm text-gray-400 truncate">{collection}</div>
						{name && <div className="font-semibold truncate">{name}</div>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Token;
