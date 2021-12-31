import { gql, useQuery } from '@apollo/client';
import type { Account, Token as EIP721Token } from '@subgraphs/eip721';
import type { EthEIP721Response } from 'client';
import React from 'react';
import EthEIP721Asset from './EthEIP721Asset';

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

export interface EthEIP721AssetsProps {
	address: string;
}

const EthEIP721Assets: React.FC<EthEIP721AssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<EthEIP721Response<'account'>>(GET_ETH_EIP721_ASSETS, {
		variables: { owner: address }
	});

	if ((!data || !data.account) && !loading) return null;

	return (
		<>
			<div>
				{loading || !data ? (
					<span>Loading</span>
				) : (
					<>
						<div className="flex flex-wrap">
							{(data.account as Account).tokens.map((token: EIP721Token) => (
								<EthEIP721Asset token={token} />
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default EthEIP721Assets;
