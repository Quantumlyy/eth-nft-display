import { useQuery } from '@apollo/client';
import type { Account, Erc1155Balance } from '@subgraphs/eip1155-matic';
import type { EIP1155Response } from 'client';
import type { Subgraph } from 'client/graphprotocol/subgraphs';
import type { SupportedChainId } from 'constants/chains';
import { generateEIP1155Query } from 'constants/queries';
import React from 'react';
import ChainEIP1155Asset from './ChainEIP1155Asset';

export interface ChainEIP1155AssetsProps {
	address: string;
	subgraph: Subgraph;
	chainId: SupportedChainId;
}

const ChainEIP1155Assets: React.FC<ChainEIP1155AssetsProps> = ({ address, subgraph, chainId }) => {
	const { data, loading } = useQuery<EIP1155Response<'account'>>(generateEIP1155Query(chainId), {
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
					{(data.account as Account).ERC1155balances.map(
						(bal: Erc1155Balance) =>
							(bal.value as unknown as number) > 0 && <ChainEIP1155Asset displayChainId={chainId} token={bal.token} key={bal.id} />
					)}
				</>
			)}
		</>
	);
};

export default ChainEIP1155Assets;
