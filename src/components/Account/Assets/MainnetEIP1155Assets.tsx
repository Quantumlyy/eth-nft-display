import { gql, useQuery } from '@apollo/client';
import type { Account, Balance } from '@subgraphs/eip1155';
import type { EthEIP1155Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import MainnetEIP1155Asset from './MainnetEIP1155Asset';

const GET_ETH_EIP1155_ASSETS = gql`
	query GetEthereumEIP1155Assets($owner: String!) {
		account(id: $owner) {
			id
			balances {
				id
				token {
					id
					identifier
					registry {
						id
					}
				}
			}
		}
	}
`;

export interface MainnetEIP1155AssetsProps {
	address: string;
}

const MainnetEIP1155Assets: React.FC<MainnetEIP1155AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<EthEIP1155Response<'account'>>(GET_ETH_EIP1155_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.MAINNET_EIP1155 }
	});

	if ((!data || !data.account) && !loading) return null;

	return (
		<>
			{loading || !data ? (
				<span>Loading</span>
			) : (
				<>
					{(data.account as Account).balances.map((bal: Balance) => (
						<MainnetEIP1155Asset token={bal.token} key={bal.id} />
					))}
				</>
			)}
		</>
	);
};

export default MainnetEIP1155Assets;
