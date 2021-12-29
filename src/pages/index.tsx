import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import Offset from 'components/Navbar/Offset';
import { gql, useQuery } from '@apollo/client';
import type { EIP721Response } from 'client';

const GET_ASSETS = gql`
	query GetEIP721Assets($owner: String!) {
		account(id: $owner) {
			id
			token {
				id
				uri
			}
		}
	}
`;

export default function Home() {
	const { account, library } = useWeb3React<Web3Provider>();

	const isConnected = typeof account === 'string' && Boolean(library);

	const { data } = useQuery<EIP721Response<'account'>>(GET_ASSETS, { variables: { owner: (account ?? '').toLowerCase() } });
	console.log(data);

	return (
		<div>
			<Offset />
			Yeet
			{isConnected ? <h1>Hello</h1> : null}
		</div>
	);
}
