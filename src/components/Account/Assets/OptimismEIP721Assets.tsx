import { gql, useQuery } from '@apollo/client';
import type { Account, Erc721Token } from '@subgraphs/eip721-matic';
import type { OptEIP721Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import OptimismEIP721Asset from './OptimismEIP721Asset';

const GET_OPTIMISM_EIP721_ASSETS = gql`
	query GetOptimismEIP721Assets($owner: String!) {
		account(id: $owner) {
			id
			ERC721tokens {
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

export interface OptimismEIP721AssetsProps {
	address: string;
}

const OptimismEIP721Assets: React.FC<OptimismEIP721AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<OptEIP721Response<'account'>>(GET_OPTIMISM_EIP721_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.OPTIMISM_EIP721 }
	});

	if ((!data || !data.account) && !loading) return null;

	return (
		<>
			{loading || !data ? (
				<span>Loading</span>
			) : (
				<>
					{(data.account as Account).ERC721tokens.map((token: Erc721Token) => (
						<OptimismEIP721Asset token={token} key={token.id} />
					))}
				</>
			)}
		</>
	);
};

export default OptimismEIP721Assets;
