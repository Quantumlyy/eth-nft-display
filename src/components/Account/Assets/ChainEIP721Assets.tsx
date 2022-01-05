import { useQuery } from '@apollo/client';
import type { Account, Erc721Token } from '@subgraphs/eip721-matic';
import type { EIP721Response } from 'client';
import type { Subgraph } from 'client/graphprotocol/subgraphs';
import type { SupportedChainId } from 'constants/chains';
import { generateEIP721Query } from 'constants/queries';
import React from 'react';
import ChainEIP721Asset from './ChainEIP721Asset';

export interface ChainEIP721AssetsProps {
	address: string;
	subgraph: Subgraph;
	chainId: SupportedChainId;
}

const ChainEIP721Assets: React.FC<ChainEIP721AssetsProps> = ({ address, chainId, subgraph }) => {
	const { data, loading } = useQuery<EIP721Response<'account'>>(generateEIP721Query(chainId), {
		variables: { owner: address },
		context: { subgraph },
		fetchPolicy: 'no-cache'
	});

	if ((!data || !data.account) && !loading) return null;

	return (
		<>
			{loading || !data ? (
				<span>Loading</span>
			) : (
				<>
					{(data.account as Account).ERC721tokens.map((token: Erc721Token) => (
						<ChainEIP721Asset displayChainId={chainId} token={token} key={token.id} />
					))}
				</>
			)}
		</>
	);
};

export default ChainEIP721Assets;
