import type { Token as EIP721Token } from '@subgraphs/eip721';
import { EIP721_BASIC_ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useAlchemyProviders from 'hooks/useAlchemyProviders';
import React, { useEffect, useState } from 'react';
import type { BaseOSMetadata } from 'types/metadata';
import { quirkIPFSGateway, quirkIPFSProtocol } from 'utils/quirks/ipfs';
import Token, { ChainIndicator } from '../Token';

export interface MainnetEIP721AssetProps {
	token: EIP721Token;
}

const MainnetEIP721Asset: React.FC<MainnetEIP721AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const { mainnet } = useAlchemyProviders();
	const [valid, setValid] = useState(true);
	const [collection, setCollection] = useState('');
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		async function logic() {
			if (!token.uri || !library || !chainId) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.registry.id, EIP721_BASIC_ABI, chainId === SupportedChainId.MAINNET ? library : mainnet);
			let uri: string = await contract.tokenURI(token.identifier);
			const uriStructure = new URL(uri);
			let shouldProxy = true;

			[uri, shouldProxy] = quirkIPFSProtocol(uri, uriStructure, shouldProxy);
			[uri, shouldProxy] = quirkIPFSGateway(uri, shouldProxy);

			if (uriStructure.protocol === 'data:') {
				const uriBlobParts = uri.split(',');
				const blob = uriBlobParts[uriBlobParts.length - 1];

				try {
					atob(blob);
				} catch {
					setValid(false);
					return;
				}

				setMetadata(JSON.parse(atob(blob)));
			} else if (uriStructure.protocol.includes('http') || uriStructure.protocol === 'ipfs:') {
				await fetch(`${shouldProxy ? process.env.NEXT_PUBLIC_CORS_PROXY : ''}${uri}`)
					.then((res) => res.json())
					.then(setMetadata);
			}

			try {
				if (!token.registry.name) setCollection(await contract.name());
			} catch {}
		}

		void logic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return <Token indicator={ChainIndicator.Mainnet} collection={token.registry.name || collection} image={metadata?.image || metadata?.image_url} />;
};

export default MainnetEIP721Asset;
