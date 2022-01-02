import { gql, useQuery } from '@apollo/client';
import type { Account, Erc721Token } from '@subgraphs/eip721-matic';
import type { ArbEIP721Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import ArbitrumEIP721Asset from './ArbitrumEIP721Asset';

const GET_ARB_EIP721_ASSETS = gql`
	query GetArbitrumEIP721Assets($owner: String!) {
		account(id: $owner) {
			id
			ERC721tokens(first: 999) {
				id
				uri
				identifier
				contract {
					id
					name
					symbol
				}
			}
		}
	}
`;

export interface ArbitrumEIP721AssetsProps {
	address: string;
}

const ArbitrumEIP721Assets: React.FC<ArbitrumEIP721AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<ArbEIP721Response<'account'>>(GET_ARB_EIP721_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.ARBITRUM_EIP721 },
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
						<ArbitrumEIP721Asset token={token} key={token.id} />
					))}
				</>
			)}
		</>
	);
};

export default ArbitrumEIP721Assets;
