import { gql, useQuery } from '@apollo/client';
import type { Account, Token as EIP721Token } from '@subgraphs/eip721';
import type { EthEIP721Response } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import MainnetEIP721Asset from './MainnetEIP721Asset';

const GET_ETH_EIP721_ASSETS = gql`
	query GetEthereumEIP721Assets($owner: String!) {
		account(id: $owner) {
			id
			tokens {
				id
				uri
				identifier
				registry {
					id
					name
					symbol
				}
			}
		}
	}
`;

export interface MainnetEIP721AssetsProps {
	address: string;
}

const MainnetEIP721Assets: React.FC<MainnetEIP721AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<EthEIP721Response<'account'>>(GET_ETH_EIP721_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.MAINNET_EIP721 }
	});

	if ((!data || !data.account) && !loading) return null;

	return (
		<>
			{loading || !data ? (
				<span>Loading</span>
			) : (
				<>
					{(data.account as Account).tokens.map((token: EIP721Token) => (
						<MainnetEIP721Asset token={token} key={token.id} />
					))}
				</>
			)}
		</>
	);
};

export default MainnetEIP721Assets;
