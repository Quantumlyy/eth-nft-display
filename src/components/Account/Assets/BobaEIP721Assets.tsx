import { gql, useQuery } from '@apollo/client';
import type { Account, Erc721Token } from '@subgraphs/eip721-matic';
import type { BobaEIP721Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import BobaEIP721Asset from './BobaEIP721Asset';

const GET_BOBA_EIP721_ASSETS = gql`
	query GetBobaEIP721Assets($owner: String!) {
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

export interface BobaEIP721AssetsProps {
	address: string;
}

const BobaEIP721Assets: React.FC<BobaEIP721AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<BobaEIP721Response<'account'>>(GET_BOBA_EIP721_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.BOBA_EIP721 },
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
						<BobaEIP721Asset token={token} key={token.id} />
					))}
				</>
			)}
		</>
	);
};

export default BobaEIP721Assets;
