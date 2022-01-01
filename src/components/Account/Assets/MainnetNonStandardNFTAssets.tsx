import { gql, useQuery } from '@apollo/client';
import type { Account, Token } from '@subgraphs/non-standard-nfts';
import type { EthNonStandardNFTsResponse } from 'client';
import { Subgraph } from 'client/graphprotocol/subgraphs';
import React from 'react';
import MainnetNonStandardNFTAsset from './MainnetNonStandardNFTAsset';

const GET_ETH_NON_STANDARD_NFT_ASSETS = gql`
	query GetEthereumNonStandardNFTAssets($owner: String!) {
		account(id: $owner) {
			id
			tokens(first: 999) {
				id
				identifier
				uri
				registry {
					id
					name
					symbol
				}
			}
		}
	}
`;

export interface MainnetNonStandardNFTAssetsProps {
	address: string;
}

const MainnetNonStandardNFTAssets: React.FC<MainnetNonStandardNFTAssetsProps> = ({ address }) => {
	const { data, loading } = useQuery<EthNonStandardNFTsResponse<'account'>>(GET_ETH_NON_STANDARD_NFT_ASSETS, {
		variables: { owner: address },
		context: { subgraph: Subgraph.MAINNET_NON_STANDARD },
		fetchPolicy: 'no-cache'
	});

	if ((!data || !data.account) && !loading) return null;

	return (
		<>
			{loading || !data ? (
				<span>Loading</span>
			) : (
				<>
					{(data.account as Account).tokens.map((token: Token) => (
						<MainnetNonStandardNFTAsset token={token} key={token.id} />
					))}
				</>
			)}
		</>
	);
};

export default MainnetNonStandardNFTAssets;
