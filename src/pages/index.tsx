import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import Offset from 'components/Navbar/Offset';
import { gql, useQuery } from '@apollo/client';
import type { EIP721Response } from 'client';
import type { Account, Token as EIP721Token } from '@subgraphs/eip721';
import Token from 'components/Account/Token';

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

export default function Home() {
	const { account, library } = useWeb3React<Web3Provider>();

	const isConnected = typeof account === 'string' && Boolean(library);

	const { data, loading } = useQuery<EIP721Response<'account'>>(GET_ASSETS, { variables: { owner: (account ?? '').toLowerCase() } });
	console.log(data);

	return (
		<div>
			<Offset />
			{isConnected ? (
				<>
					<h1>Hello</h1>
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
			) : null}
		</div>
	);
}
