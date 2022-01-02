import { gql, useQuery } from '@apollo/client';
import type { Account, Erc1155Balance } from '@subgraphs/eip1155-matic';
import type { PlyEIP1155Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import PolygonEIP1155Asset from './PolygonEIP1155Asset';

const GET_PLY_EIP1155_ASSETS = gql`
	query GetPolygonEIP1155Assets($owner: String!) {
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

export interface PolygonEIP1155AssetsProps {
	address: string;
}

const PolygonEIP1155Assets: React.FC<PolygonEIP1155AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<PlyEIP1155Response<'account'>>(GET_PLY_EIP1155_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.POLYGON_EIP1155 },
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
						(bal: Erc1155Balance) => (bal.value as unknown as number) > 0 && <PolygonEIP1155Asset token={bal.token} key={bal.id} />
					)}
				</>
			)}
		</>
	);
};

export default PolygonEIP1155Assets;
