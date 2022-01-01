import type { Token as EIP1155Token } from '@subgraphs/eip1155';
import { EIP1155_BASIC_ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useAlchemyProviders from 'hooks/useAlchemyProviders';
import React, { useEffect, useState } from 'react';
import type { BaseOSMetadata } from 'types/metadata';
import { EthNiftyContract, EthOpenSeaSharedStorefront } from 'utils/quirks';
import { quirkIPFSGateway, quirkIPFSHash, quirkIPFSProtocol } from 'utils/quirks/ipfs';
import Token, { ChainIndicator } from '../Token';

export interface MainnetEIP1155AssetProps {
	token: EIP1155Token;
}

const MainnetEIP1155Asset: React.FC<MainnetEIP1155AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const { mainnet } = useAlchemyProviders();
	const [valid, setValid] = useState(true);
	const [collection, setCollection] = useState('');
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		async function logic() {
			if (!token.registry.id || !token.identifier || !library || !chainId) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.registry.id, EIP1155_BASIC_ABI, chainId === SupportedChainId.MAINNET ? library : mainnet);
			let uri: string = await contract.uri(token.identifier);
			let shouldProxy = true;
			[uri, shouldProxy] = quirkIPFSHash(uri, shouldProxy);
			const uriStructure = new URL(uri);

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
				if (token.registry.id === EthOpenSeaSharedStorefront) {
					shouldProxy = false;
					uri = uri.replace('0x{id}', `${token.identifier}`);
				}
				if (token.registry.id === EthNiftyContract) {
					shouldProxy = false;
					uri = uri.replace('{id}', `${token.identifier}`);
				}

				await fetch(`${shouldProxy ? process.env.NEXT_PUBLIC_CORS_PROXY : ''}${uri.trim()}`)
					.then((res) => res.json())
					.then(setMetadata)
					.catch(() => {
						setValid(false);
					});
			}

			try {
				if (!metadata?.name) setCollection(await contract.name());
			} catch {}
		}

		void logic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return (
		<Token
			indicator={ChainIndicator.Mainnet}
			collection={collection || `Unidentified contract ${token.registry.id}`}
			name={metadata?.name}
			image={metadata?.image || metadata?.image_url}
		/>
	);
};

export default MainnetEIP1155Asset;
