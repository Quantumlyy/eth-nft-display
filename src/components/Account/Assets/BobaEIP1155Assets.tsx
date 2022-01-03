import { gql, useQuery } from '@apollo/client';
import type { Account, Erc1155Balance } from '@subgraphs/eip1155-matic';
import type { BobaEIP1155Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import BobaEIP1155Asset from './BobaEIP1155Asset';

const GET_BOBA_EIP1155_ASSETS = gql`
	query GetBobaEIP1155Assets($owner: String!) {
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

export interface BobaEIP1155AssetsProps {
	address: string;
}

const BobaEIP1155Assets: React.FC<BobaEIP1155AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<BobaEIP1155Response<'account'>>(GET_BOBA_EIP1155_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.BOBA_EIP1155 },
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
						(bal: Erc1155Balance) => (bal.value as unknown as number) > 0 && <BobaEIP1155Asset token={bal.token} key={bal.id} />
					)}
				</>
			)}
		</>
	);
};

export default BobaEIP1155Assets;
