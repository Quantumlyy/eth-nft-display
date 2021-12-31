import type { Erc721Token } from '@subgraphs/eip721-matic';
import { EIP721_BASIC_ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useAlchemyProviders from 'hooks/useAlchemyProviders';
import React, { useEffect, useState } from 'react';
import type { BaseOSMetadata } from 'types/metadata';
import { quirkIPFSGateway, quirkIPFSProtocol } from 'utils/quirks/ipfs';
import Token, { ChainIndicator } from '../Token';

export interface OptimismEIP721AssetProps {
	token: Erc721Token;
}

const OptimismEIP721Asset: React.FC<OptimismEIP721AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const { optimism } = useAlchemyProviders();
	const [valid, setValid] = useState(true);
	const [collection, setCollection] = useState('');
	const [metadata, setMetadata] = useState<BaseOSMetadata>();

	useEffect(() => {
		async function logic() {
			if (!library || !chainId) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.contract.id, EIP721_BASIC_ABI, chainId === SupportedChainId.OPTIMISM ? library : optimism);
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
				if (!token.contract.name) setCollection(await contract.name());
			} catch {}
		}

		void logic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid) return null;

	return (
		<Token indicator={ChainIndicator.Optimism} collection={token.contract.name || collection} image={metadata?.image || metadata?.image_url} />
	);
};

export default OptimismEIP721Asset;
