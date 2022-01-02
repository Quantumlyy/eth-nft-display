import { gql, useQuery } from '@apollo/client';
import type { Account, Erc1155Balance } from '@subgraphs/eip1155-matic';
import type { OptEIP1155Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import OptimismEIP1155Asset from './OptimismEIP1155Asset';

const GET_OPT_EIP1155_ASSETS = gql`
	query GetOptimismEIP1155Assets($owner: String!) {
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

export interface OptimismEIP1155AssetsProps {
	address: string;
}

const OptimismEIP1155Assets: React.FC<OptimismEIP1155AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<OptEIP1155Response<'account'>>(GET_OPT_EIP1155_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.OPTIMISM_EIP1155 },
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
						(bal: Erc1155Balance) => (bal.value as unknown as number) > 0 && <OptimismEIP1155Asset token={bal.token} key={bal.id} />
					)}
				</>
			)}
		</>
	);
};

export default OptimismEIP1155Assets;
