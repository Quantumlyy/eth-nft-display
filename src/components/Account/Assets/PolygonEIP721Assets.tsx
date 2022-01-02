import { gql, useQuery } from '@apollo/client';
import type { Account, Erc721Token } from '@subgraphs/eip721-matic';
import type { PlyEIP721Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import PolygonEIP721Asset from './PolygonEIP721Asset';

const GET_PLY_EIP721_ASSETS = gql`
	query GetPolygonEIP721Assets($owner: String!) {
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

export interface PolygonEIP721AssetsProps {
	address: string;
}

const PolygonEIP721Assets: React.FC<PolygonEIP721AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<PlyEIP721Response<'account'>>(GET_PLY_EIP721_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.POLYGON_EIP721 },
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
						<PolygonEIP721Asset token={token} key={token.id} />
					))}
				</>
			)}
		</>
	);
};

export default PolygonEIP721Assets;
