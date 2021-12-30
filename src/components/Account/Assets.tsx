import { gql, useQuery } from '@apollo/client';
import type { Account, Token as EIP721Token } from '@subgraphs/eip721';
import type { EIP721Response } from 'client';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import Token from './Token';

const GET_ASSETS = gql`
	query GetEIP721Assets($owner: String!) {
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

const Assets: React.FC = () => {
	const { account } = useActiveWeb3React();
	const { data, loading } = useQuery<EIP721Response<'account'>>(GET_ASSETS, { variables: { owner: (account ?? '').toLowerCase() } });

	return (
		<>
			<div>
				{loading || !data ? (
					<span>Loading</span>
				) : (
					<>
						{(data.account as Account).tokens.map((token: EIP721Token) => (
							<Token token={token} />
						))}
					</>
				)}
			</div>
		</>
	);
};

export default Assets;
