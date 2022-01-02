import type { Erc1155Token } from '@subgraphs/eip1155-matic';
import { EIP1155_BASIC_ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useAlchemyProviders from 'hooks/useAlchemyProviders';
import React, { useEffect, useState } from 'react';
import type { BaseMetadata } from 'types/metadata';
import { metadataAPI, metadataBase64 } from 'utils/metadata';
import { quirkURIQuirks } from 'utils/quirks/uri';
import Asset, { ChainIndicator } from '../Asset';

export interface OptimismEIP1155AssetProps {
	token: Erc1155Token;
}

const OptimismEIP1155Asset: React.FC<OptimismEIP1155AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const { optimism } = useAlchemyProviders();
	const [valid, setValid] = useState(true);
	const [collection, setCollection] = useState('');
	const [metadata, setMetadata] = useState<BaseMetadata>();

	useEffect(() => {
		async function logic() {
			if (!token.contract.id || !token.identifier || !library || !chainId) {
				setValid(false);
				return;
			}

			const contract = new Contract(token.contract.id, EIP1155_BASIC_ABI, chainId === SupportedChainId.OPTIMISM ? library : optimism);
			const contractURI: string = await contract.uri(token.identifier);
			const [uri, protocol, shouldProxy] = quirkURIQuirks(contractURI);

			if (protocol === 'data:') {
				const [metadata_, valid_] = await metadataBase64(uri);
				setValid(valid_);
				setMetadata(metadata_);
			} else if (protocol.includes('http') || protocol === 'ipfs:') {
				const [metadata_, valid_] = await metadataAPI(
					uri,
					chainId,
					SupportedChainId.OPTIMISM,
					{ identifier: token.identifier, contract: { id: token.contract.id } },
					shouldProxy
				);
				setValid(valid_);
				setMetadata(metadata_);
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
		<Asset
			indicator={ChainIndicator.Optimism}
			collection={collection || `Unidentified contract ${token.contract.id}`}
			name={metadata?.name}
			image={metadata?.image || metadata?.image_url}
		/>
	);
};

export default OptimismEIP1155Asset;
