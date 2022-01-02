import { gql, useQuery } from '@apollo/client';
import type { Account, Erc1155Balance } from '@subgraphs/eip1155-matic';
import type { ArbEIP1155Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import ArbitrumEIP1155Asset from './ArbitrumEIP1155Asset';

const GET_ARB_EIP1155_ASSETS = gql`
	query GetArbitrumEIP1155Assets($owner: String!) {
		account(id: $owner) {
			id
			ERC1155balances {
				id
				value
				token {
					id
					identifier
					contract {
						id
					}
				}
			}
		}
	}
`;

export interface ArbitrumEIP1155AssetsProps {
	address: string;
}

const ArbitrumEIP1155Assets: React.FC<ArbitrumEIP1155AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<ArbEIP1155Response<'account'>>(GET_ARB_EIP1155_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.ARBITRUM_EIP1155 },
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
						(bal: Erc1155Balance) => (bal.value as unknown as number) > 0 && <ArbitrumEIP1155Asset token={bal.token} key={bal.id} />
					)}
				</>
			)}
		</>
	);
};

export default ArbitrumEIP1155Assets;
