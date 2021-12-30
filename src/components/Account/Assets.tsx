import { gql, useQuery } from '@apollo/client';
import type { Account, Token as EIP721Token } from '@subgraphs/eip721';
import type { EIP721Response } from 'client';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useENSDomain from 'hooks/useENSDomain';
import React from 'react';
import Token from './Token';

const GET_ASSETS = gql`
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

export interface AssetsProps {
	address?: string;
}

const Assets: React.FC<AssetsProps> = ({ address }) => {
	const resolvedAddress = useENSDomain(address);
	const { account } = useActiveWeb3React();
	const { data, loading } = useQuery<EIP721Response<'account'>>(GET_ASSETS, {
		variables: { owner: (resolvedAddress || address || account || '').toLowerCase() }
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
								<Token token={token} />
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Assets;
